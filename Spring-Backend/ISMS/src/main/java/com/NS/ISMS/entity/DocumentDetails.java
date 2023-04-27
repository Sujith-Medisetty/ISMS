package com.NS.ISMS.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DocumentDetails {

    @Id
    @SequenceGenerator(name = "document_details_sequence", sequenceName = "document_details_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "document_details_sequence")
    private long id;
    private String name;
    private String description;

    @Lob
    @Column(length = 16777215) // 16MB column size
    private byte[] document;

// adjust the length as needed
    private byte[] encryptionKey; // add a field for the encrypted secret key
    private LocalDateTime createdOrLastModifiedAt;
    
}
