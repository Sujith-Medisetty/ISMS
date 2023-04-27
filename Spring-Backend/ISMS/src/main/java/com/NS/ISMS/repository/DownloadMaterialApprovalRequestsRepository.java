package com.NS.ISMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NS.ISMS.entity.DownloadMaterialApprovalRequests;

public interface DownloadMaterialApprovalRequestsRepository extends JpaRepository<DownloadMaterialApprovalRequests, Long> {
    
    Optional<DownloadMaterialApprovalRequests> findByEmail(String email);

}
