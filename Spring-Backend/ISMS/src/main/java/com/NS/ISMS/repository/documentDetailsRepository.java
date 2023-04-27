package com.NS.ISMS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.NS.ISMS.entity.DocumentDetails;

@Repository
public interface documentDetailsRepository extends JpaRepository<DocumentDetails, Long> {

    @Query("SELECT d.id, d.name, d.description FROM DocumentDetails d")
    List<Object[]> findAllDocumentDetails();
}
