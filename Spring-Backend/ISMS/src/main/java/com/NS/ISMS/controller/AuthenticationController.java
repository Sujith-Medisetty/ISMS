package com.NS.ISMS.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.NS.ISMS.entity.UserRegistrationQueue;
import com.NS.ISMS.helpers.AuthenticationRequest;
import com.NS.ISMS.helpers.RegisterRequest;
import com.NS.ISMS.security.service.AuthenticationService;
import com.NS.ISMS.service.LoginAndUserRegistrationQueueImpl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://localhost:4200")
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<Map<String, String>> register(
      @RequestBody RegisterRequest request, HttpServletResponse response
  ) {
    return service.register(request, response);
  }
  @PostMapping("/authenticate")
  public ResponseEntity<Map<String, String>> authenticate(
      @RequestBody AuthenticationRequest request, HttpServletResponse response
  ) {
    return service.authenticate(request, response);
  }

  @Autowired
  public LoginAndUserRegistrationQueueImpl loginAndUserRegistrationQueueImpl;

  @Autowired
  public PasswordEncoder passwordEncoder;

  @PostMapping("/saveUserToRegistry")
  @ResponseBody
  public Map<String, String> saveUserInfoToUserRegistrationQueue(@RequestBody UserRegistrationQueue userInfo){
    userInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
      Map<String, String> response = new HashMap<>();
      System.out.println("hey u got pinged");
      boolean isExist = loginAndUserRegistrationQueueImpl.isUserExist(userInfo);
      if(userInfo != null && !isExist){
          //userInfo.setRole(Role.ROLE_USER);
          UserRegistrationQueue UInfo = loginAndUserRegistrationQueueImpl.saveUserInfoToRegistrationQueue(userInfo);
          if(UInfo != null){
              response.put("status", "success");
              response.put("message", "Account Activation details are sent to admin! Will ACK via email once the account has been activated!");
          } else {
              response.put("status", "error");
              response.put("message", "Error saving user information to registration queue.");
          }
      } else {
          response.put("status", "error");
          response.put("message", "User information is missing or invalid or userinfo already exist..!");
      }
      return response;
  }
}
