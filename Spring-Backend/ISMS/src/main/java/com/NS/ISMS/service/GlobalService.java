package com.NS.ISMS.service;

import java.util.List;
import java.util.Optional;

import com.NS.ISMS.entity.User;
import com.NS.ISMS.entity.UserRegistrationQueue;

public interface GlobalService {
    public Optional<User> getCurrentLoggedInProfile(String email);

    public List<UserRegistrationQueue> getAllRegistrationQueueUsers();
}
