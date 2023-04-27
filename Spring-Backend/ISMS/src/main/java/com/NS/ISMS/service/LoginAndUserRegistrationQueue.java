package com.NS.ISMS.service;


import java.util.List;

import com.NS.ISMS.entity.UserRegistrationQueue;

public interface LoginAndUserRegistrationQueue {
    
    public UserRegistrationQueue saveUserInfoToRegistrationQueue(UserRegistrationQueue userInfo);
}
