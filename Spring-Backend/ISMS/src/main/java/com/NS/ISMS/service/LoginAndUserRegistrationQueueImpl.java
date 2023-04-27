package com.NS.ISMS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NS.ISMS.entity.User;
import com.NS.ISMS.entity.UserRegistrationQueue;
import com.NS.ISMS.repository.UserRegistrationQueueRepository;
import com.NS.ISMS.repository.UserRepository;

@Service
public class LoginAndUserRegistrationQueueImpl implements LoginAndUserRegistrationQueue {
    @Autowired
    private UserRegistrationQueueRepository userRegistrationQueueRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserRegistrationQueue saveUserInfoToRegistrationQueue(UserRegistrationQueue userInfo) {
        return userRegistrationQueueRepository.save(userInfo);
    }

    public boolean isUserExist(UserRegistrationQueue userInfo) {
        Optional<User> user = userRepository.findByEmail(userInfo.getEmail());
        Optional<UserRegistrationQueue> user2 = userRegistrationQueueRepository.findByEmail(userInfo.getEmail());
        if (user.isPresent() || user2.isPresent()) {
            return true;
        }
        return false;
    }
}
