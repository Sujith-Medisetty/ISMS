package com.NS.ISMS.service;

import java.io.ByteArrayInputStream;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.NS.ISMS.entity.Announcement;
import com.NS.ISMS.entity.DocumentDetails;
import com.NS.ISMS.entity.DownloadMaterialApprovalRequests;
import com.NS.ISMS.entity.DownloadMaterialApprovedRequests;
import com.NS.ISMS.entity.User;
import com.NS.ISMS.entity.UserRegistrationQueue;
import com.NS.ISMS.helpers.DocumentHelper;
import com.NS.ISMS.helpers.UserInfo;
import com.NS.ISMS.repository.AnnouncementRepository;
import com.NS.ISMS.repository.DownloadMaterialApprovalRequestsRepository;
import com.NS.ISMS.repository.DownloadMaterialApprovedRequestsRepository;
import com.NS.ISMS.repository.TokenRepository;
import com.NS.ISMS.repository.UserRegistrationQueueRepository;
import com.NS.ISMS.repository.UserRepository;
import com.NS.ISMS.repository.documentDetailsRepository;

@Service
public class GlobalServiceImpl implements GlobalService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRegistrationQueueRepository userRegistrationQueueRepository;

    @Autowired
    documentDetailsRepository documentDetailsRepository;

    @Autowired
    DownloadMaterialApprovalRequestsRepository downloadMaterialApprovalRequestsRepository;

    @Autowired
    DownloadMaterialApprovedRequestsRepository downloadMaterialApprovedRequestsRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Override
    public Optional<User> getCurrentLoggedInProfile(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserRegistrationQueue> getAllRegistrationQueueUsers() {
        return userRegistrationQueueRepository.findAll();
    }

    public void deleteAUserFromUserRegistrationQueue(UserRegistrationQueue userInfo) {
        userRegistrationQueueRepository.delete(userInfo);
    }

    public User saveUser(UserRegistrationQueue userInfo) {
        User user = new User();
        user.setEmail(userInfo.getEmail());
        user.setName(userInfo.getName());
        user.setPassword(userInfo.getPassword());
        user.setRole(userInfo.getRole());
        return userRepository.save(user);
    }

    public UserInfo saveUserDetails(User user) {
        User userDetails = userRepository.save(user);
        return UserInfo.builder()
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .name(userDetails.getName())
                .password(userDetails.getPassword())
                .role(userDetails.getRole())
                .build();

    }

    public void uploadPdfDocument(MultipartFile file, String description) throws Exception {
        // Generate an encryption key
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(256);
        SecretKey secretKey = keyGen.generateKey();
        byte[] encryptionKey = secretKey.getEncoded();

        // Encrypt the document using the encryption key
        byte[] encryptedDocument = encrypt(file.getBytes(), secretKey);

        // Create a new DocumentDetails entity and save it to the database
        DocumentDetails documentDetails = new DocumentDetails();
        documentDetails.setName(file.getOriginalFilename());
        documentDetails.setDocument(encryptedDocument);
        documentDetails.setEncryptionKey(encryptionKey);
        documentDetails.setCreatedOrLastModifiedAt(LocalDateTime.now());
        documentDetails.setDescription(description);
        documentDetailsRepository.save(documentDetails);
    }

    public List<DocumentHelper> getAllDocumentsDetails() {
        List<Object[]> documentDetailsList = documentDetailsRepository.findAllDocumentDetails();
        List<DocumentHelper> documentHelperList = new ArrayList<>();

        for (Object[] doc : documentDetailsList) {
            DocumentHelper documentHelper = DocumentHelper.builder()
                    .id((Long) doc[0])
                    .name((String) doc[1])
                    .description((String) doc[2])
                    .build();
            documentHelperList.add(documentHelper);
        }

        return documentHelperList;
    }

    public ResponseEntity<InputStreamResource> downloadPdfDocument(Long id) throws Exception {
        // Retrieve the PdfDocument entity from the database using the provided ID
        Optional<DocumentDetails> optionalPdfDocument = documentDetailsRepository.findById(id);
        if (!optionalPdfDocument.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        DocumentDetails pdfDocument = optionalPdfDocument.get();

        // Decrypt the document using the encryption key
        byte[] decryptedDocument = decrypt(pdfDocument.getDocument(), pdfDocument.getEncryptionKey());

        // Create an InputStreamResource from the decrypted document and return it as a
        // ResponseEntity with the correct headers and content type
        InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(decryptedDocument));
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + pdfDocument.getName());
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
        headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(decryptedDocument.length));
        return new ResponseEntity<>(inputStreamResource, headers, HttpStatus.OK);
    }

    public DocumentDetails getDocument(Long id) throws Exception {
        DocumentDetails doc = documentDetailsRepository.findById(id).get();
        doc.setDocument(decrypt(doc.getDocument(), doc.getEncryptionKey()));
        doc.setEncryptionKey(null);
        return doc;
    }

    private byte[] encrypt(byte[] input, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[cipher.getBlockSize()];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));
        byte[] encrypted = cipher.doFinal(input);
        byte[] result = new byte[iv.length + encrypted.length];
        System.arraycopy(iv, 0, result, 0, iv.length);
        System.arraycopy(encrypted, 0, result, iv.length, encrypted.length);
        return result;
    }

    private byte[] decrypt(byte[] input, byte[] key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[cipher.getBlockSize()];
        System.arraycopy(input, 0, iv, 0, iv.length);
        byte[] encrypted = new byte[input.length - iv.length];
        System.arraycopy(input, iv.length, encrypted, 0, encrypted.length);
        cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"), new IvParameterSpec(iv));
        return cipher.doFinal(encrypted);
    }

    public Boolean deleteDocument(Long id) {
        documentDetailsRepository.deleteById(id);
        return true;
    }

    public List<UserInfo> getAllPeople() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> UserInfo.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build())
                .collect(Collectors.toList());
    }

    @Autowired
    private AnnouncementRepository announcementRepository;

    public List<Announcement> saveAnnouncements(List<Announcement> announcements) {
        System.out.println("yes here..!");
        return announcementRepository.saveAll(announcements);
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    public User getUser(String userEmail) {
        return userRepository.findByEmail(userEmail).get();
    }

    public List<DownloadMaterialApprovalRequests> pendingMaterialApprovalRequests() {
        return this.downloadMaterialApprovalRequestsRepository.findAll();
    }

    public List<DownloadMaterialApprovedRequests> approvedMaterialApprovedRequests() {
        return this.downloadMaterialApprovedRequestsRepository.findAll();
    }

    public Boolean isUserInDownloadApprovalWaitingList(String email) {
        if (this.downloadMaterialApprovalRequestsRepository.findByEmail(email).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public Boolean isUserInDownloadApprovedList(String email) {
        if (this.downloadMaterialApprovedRequestsRepository.findByEmail(email).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    public Boolean approveDownloadMaterialRequest(String email) {
        Optional<DownloadMaterialApprovalRequests> obj = this.downloadMaterialApprovalRequestsRepository
                .findByEmail(email);
        if (obj.isPresent() && this.downloadMaterialApprovedRequestsRepository
                .save(DownloadMaterialApprovedRequests.builder().email(email).build()) != null) {
            this.downloadMaterialApprovalRequestsRepository.deleteById(obj.get().getId());
            return true;
        } else {
            return false;
        }
    }

    public Boolean rejectDownloadMaterialRequest(String email) {
        boolean value = false;
        Optional<DownloadMaterialApprovalRequests> obj1 = this.downloadMaterialApprovalRequestsRepository
                .findByEmail(email);

        Optional<DownloadMaterialApprovedRequests> obj2 = this.downloadMaterialApprovedRequestsRepository
                .findByEmail(email);

        if (obj1.isPresent()) {
            downloadMaterialApprovalRequestsRepository.deleteById(obj1.get().getId());
            value = true;
        }

        if (obj2.isPresent()) {
            downloadMaterialApprovedRequestsRepository.deleteById(obj2.get().getId());
            value = true;
        }

        return value;
    }

    public Boolean requestToDownloadMaterial(String email) {
        Optional<DownloadMaterialApprovalRequests> obj = this.downloadMaterialApprovalRequestsRepository
                .findByEmail(email);
        if (!obj.isPresent()) {
            downloadMaterialApprovalRequestsRepository
                    .save(DownloadMaterialApprovalRequests.builder().email(email).build());
        }
        return true;
    }

    public List<Announcement> getAnnouncements(String email) {
        return this.announcementRepository.findByEmail(email);
    }

    public Boolean deletePeople(UserInfo userInfo) {
        this.tokenRepository.deleteAllByUserId(userInfo.getId());
        this.userRepository.deleteByEmail(userInfo.getEmail());
        ;
        System.out.println("in delete service");
        if (!this.userRepository.findByEmail(userInfo.getEmail()).isPresent()) {
            return true;
        }
        return false;
    }

    public Boolean deleteAnnouncement(Announcement announcement) {
        this.announcementRepository.delete(announcement);
        if (!this.announcementRepository.findById(announcement.getId()).isPresent()) {
            return true;
        } else {
            return false;
        }
    }

}
