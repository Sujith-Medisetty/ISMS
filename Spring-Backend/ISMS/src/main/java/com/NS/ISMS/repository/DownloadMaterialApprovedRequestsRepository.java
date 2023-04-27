package com.NS.ISMS.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NS.ISMS.entity.DownloadMaterialApprovedRequests;

public interface DownloadMaterialApprovedRequestsRepository extends JpaRepository<DownloadMaterialApprovedRequests,Long>{
    Optional<DownloadMaterialApprovedRequests> findByEmail(String email);
}
