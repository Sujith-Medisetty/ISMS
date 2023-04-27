package com.NS.ISMS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NS.ISMS.entity.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long>{
    List<Announcement> findByEmail(String email);
}
