package com.NS.ISMS.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Announcement {
    @Id
    @SequenceGenerator(name = "announcement_sequence", sequenceName = "announcement_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "announcement_sequence")
    private Long id;

    private String email;
    private Long userId;
    private String announcementTitle;
    private String announcementText;
    private LocalDateTime announcementDateTime;
    
    @PrePersist
    protected void onCreate() {
        announcementDateTime = LocalDateTime.now();
    }
}
