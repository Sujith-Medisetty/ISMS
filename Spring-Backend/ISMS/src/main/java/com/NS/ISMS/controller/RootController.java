package com.NS.ISMS.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.NS.ISMS.entity.Announcement;
import com.NS.ISMS.entity.DownloadMaterialApprovalRequests;
import com.NS.ISMS.entity.DownloadMaterialApprovedRequests;
import com.NS.ISMS.entity.User;
import com.NS.ISMS.entity.UserRegistrationQueue;
import com.NS.ISMS.helpers.DocumentHelper;
import com.NS.ISMS.helpers.UserInfo;
import com.NS.ISMS.service.GlobalServiceImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
// @PreAuthorize("hasAuthority('ADMIN')")
@CrossOrigin(origins = "https://localhost:4200")
public class RootController {

    @Autowired
    GlobalServiceImpl globalService;

    // On init of Admin-Dashboard
    @GetMapping("/ISMS/AdminACK")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> ackAdminDashboard() {
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "Admin Successfullly Ack..!");
        return ResponseEntity.ok(responseMap);
    }

    // Om init of User-Dashboard
    @GetMapping("/ISMS/UserACK")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Map<String, String>> ackUserDashboard() {
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "User Successfullly Ack..!");
        return ResponseEntity.ok(responseMap);
    }

    // Admin-Profile
    @GetMapping("/ISMS/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public UserInfo CurrentLoggedInAdminProfile(Authentication authentication) {
        System.out.println("yes");
        User user = globalService.getCurrentLoggedInProfile(authentication.getName()).get();
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setEmail(user.getEmail());
        userInfo.setPassword(user.getPassword());
        userInfo.setRole(user.getRole());

        return userInfo;
    }

    // User-Profile
    @GetMapping("/ISMS/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public UserInfo CurrentLoggedInUserPeofile(Authentication authentication) {
        User user = globalService.getCurrentLoggedInProfile(authentication.getName()).get();
        UserInfo userInfo = new UserInfo();
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setEmail(user.getEmail());
        userInfo.setPassword(user.getPassword());
        userInfo.setRole(user.getRole());

        return userInfo;

    }

    // Get All Registration Requests
    @GetMapping("/ISMS/getAllRequests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserRegistrationQueue> getAllUsersFromRegistrationQueue() {
        return globalService.getAllRegistrationQueueUsers();
    }

    // Auth token is set as the value of cookie.. this is called at the time of
    // Logout from User/Admin dashboards.. so that the auth token will be deleted
    @GetMapping("/ISMS/delete-cookie")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<Map<String, String>> deleteCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("authToken", null); // Set the cookie name and value to null
        cookie.setMaxAge(0); // Set the cookie max age to 0 to delete it
        cookie.setPath("/"); // Set the cookie path
        response.addCookie(cookie); // Add the cookie to the response
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "Cookie deleted successfully");
        return ResponseEntity.ok(responseMap);
    }

    // Approve the User-Registration Request and persist the respective user to User
    // table.
    @PostMapping("/ISMS/AcceptUserRegistrationRequest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserRegistrationQueue> AcceptUserRegistrationRequest(@RequestBody UserRegistrationQueue userInfo) {
        User user = globalService.saveUser(userInfo);
        if (user != null) {
            globalService.deleteAUserFromUserRegistrationQueue(userInfo);
        }
        return globalService.getAllRegistrationQueueUsers();
    }

    // Reject the User Registration Request
    @PostMapping("/ISMS/RejectUserRegistrationRequest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserRegistrationQueue> RejectUserRegistrationRequest(@RequestBody UserRegistrationQueue userInfo) {
        globalService.deleteAUserFromUserRegistrationQueue(userInfo);
        return globalService.getAllRegistrationQueueUsers();
    }

    // Upload a Document
    @PostMapping("ISMS/uploadDocument")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> uploadPdfDocument(@RequestParam("file") MultipartFile file,
            String description) {
        Map<String, String> responseMap = new HashMap<>();
        try {
            System.out.println("yes came here..!");
            globalService.uploadPdfDocument(file, description);
            responseMap.put("message", "File uploaded successfully");
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            responseMap.put("message", "Failed to upload file");
            return ResponseEntity.ok(responseMap);
        }
    }

    // Download the Document
    @PostMapping("/ISMS/downloadDocument")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<InputStreamResource> downloadPdfDocument(@RequestBody Map<String, Object> material) {
        Long id = Long.parseLong(material.get("id").toString());
        try {
            // Add additional logging here
            System.out.println("Downloading PDF document with ID: " + id);
            return globalService.downloadPdfDocument(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // delete a document
    @PostMapping("/ISMS/deleteDocument")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DocumentHelper> deleteDocument(@RequestBody Map<String, Object> material) throws Exception {
        Long id = Long.parseLong(material.get("id").toString());
        globalService.deleteDocument(id);
        return globalService.getAllDocumentsDetails();

    }

    // get all the uploaded documents
    @GetMapping("/ISMS/AllMaterials")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public List<DocumentHelper> getMaterials() {
        return globalService.getAllDocumentsDetails();
    }

    // Get all People wiht role Admin and User
    @GetMapping("/ISMS/AllPeople")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public List<UserInfo> getAllPeople() {
        return globalService.getAllPeople();
    }

    // Make an announcement
    @PostMapping("/ISMS/MakeAnnouncement")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Announcement> MakeAnnouncement(@RequestBody List<Announcement> announcements) {
        System.out.println(announcements);
        System.out.println("____________________________");
        return globalService.saveAnnouncements(announcements);
    }

    // get all the announcements made so far
    @GetMapping("/ISMS/AllAnnouncements")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Announcement> getAllAnnouncements() {
        return globalService.getAllAnnouncements();
    }

    // get Announcements of a specific user
    @GetMapping("/ISMS/Announcements")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public List<Announcement> getAnnouncements(Authentication authentication) {
        return globalService.getAnnouncements(authentication.getName());
    }

    @Autowired
    public PasswordEncoder passwordEncoder;

    // profile tab in admin-dashboard

    // Save User Details into the database (Persist)
    @PostMapping("/ISMS/saveUserDetails")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_USER')")
    public UserInfo UpdateProfileDetails(@RequestBody UserInfo userInfo) {
        User user = globalService.getUser(userInfo.getEmail());
        if (!userInfo.getPassword().equals(user.getPassword())) {
            userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
        }
        user.setId(userInfo.getId());
        user.setEmail(userInfo.getEmail());
        user.setName(userInfo.getName());
        user.setPassword(userInfo.getPassword());
        user.setRole(userInfo.getRole());
        return globalService.saveUserDetails(user);
        // passwordEncoder.matches(userInfo.getPassword(), user.getPassword());
    }

    // get all Pending material approval request.. this is w.r.t User( USER Level )
    @GetMapping("/ISMS/pendingMaterialApprovalRequests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DownloadMaterialApprovalRequests> pendingMaterialApprovalRequests() {
        return this.globalService.pendingMaterialApprovalRequests();
    }

    // approve the raised material request
    @GetMapping("/ISMS/approvedMaterialApprovedRequests")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DownloadMaterialApprovedRequests> approvedMaterialApprovedRequests() {
        return this.globalService.approvedMaterialApprovedRequests();
    }

    // checks if the user in the material download waiting list
    @GetMapping("/ISMS/isUserInDownloadApprovalWaitingList")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Map<String, Boolean>> isUserInDownloadApprovalWaitingList(Authentication authentication) {
        Boolean status = this.globalService.isUserInDownloadApprovalWaitingList(authentication.getName());
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

    // checks if the user in the material dowload approved list
    @GetMapping("/ISMS/isUserInDownloadApprovedList")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Map<String, Boolean>> isUserInDownloadApprovedList(Authentication authentication) {
        Boolean status = this.globalService.isUserInDownloadApprovedList(authentication.getName());
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

    // from user dashboard - user will raise a request to download the material
    @GetMapping("/ISMS/requestToDownloadMaterial")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Map<String, Boolean>> requestToDownloadMaterial(Authentication authentication) {
        Boolean status = this.globalService.requestToDownloadMaterial(authentication.getName());
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("message", status);
        return ResponseEntity.ok(responseMap);
    }

    // approve the download material request
    @PostMapping("/ISMS/approveDownloadMaterialRequest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> approveDownloadMaterialRequest(
            @RequestBody DownloadMaterialApprovalRequests dreq) {
        Boolean status = this.globalService.approveDownloadMaterialRequest(dreq.getEmail());
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

    // reject the download material request
    @PostMapping("/ISMS/rejectDownloadMaterialRequest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> rejectDownloadMaterialRequest(
            @RequestBody DownloadMaterialApprovalRequests dreq) {
        Boolean status = this.globalService.rejectDownloadMaterialRequest(dreq.getEmail());
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/ISMS/deleteUser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deletePeople(@RequestBody UserInfo userInfo) {
        System.out.println("in delete");
        Boolean status = this.globalService.deletePeople(userInfo);
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

    @PostMapping("/ISMS/deleteAnnouncement")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteAnnouncement(@RequestBody Announcement announcement) {
        Boolean status = this.globalService.deleteAnnouncement(announcement);
        Map<String, Boolean> responseMap = new HashMap<>();
        responseMap.put("status", status);
        return ResponseEntity.ok(responseMap);
    }

}
