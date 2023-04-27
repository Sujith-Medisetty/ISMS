package com.NS.ISMS.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DownloadMaterialApprovedRequests {
    @Id
    @SequenceGenerator(name = "download_material_approved_requests_sequence", sequenceName = "download_material_approved_requests_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "download_material_approved_requests_sequence")
    private long id;
    private String email;
    private LocalDateTime approvedDateTime;

    @PrePersist
    protected void onCreate() {
        approvedDateTime = LocalDateTime.now();
    }
}
