package com.NS.ISMS.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NS.ISMS.entity.User;
import com.NS.ISMS.entity.UserRegistrationQueue;

@Repository
public interface UserRegistrationQueueRepository extends JpaRepository<UserRegistrationQueue, Integer> {

    Optional<UserRegistrationQueue> findByEmail(String email);
    
}
