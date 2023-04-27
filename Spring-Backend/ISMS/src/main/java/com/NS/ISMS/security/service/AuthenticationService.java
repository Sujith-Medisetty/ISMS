package com.NS.ISMS.security.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.NS.ISMS.data_structures.TokenType;
import com.NS.ISMS.entity.Token;
import com.NS.ISMS.entity.User;
import com.NS.ISMS.helpers.AuthenticationRequest;
import com.NS.ISMS.helpers.RegisterRequest;
import com.NS.ISMS.repository.TokenRepository;
import com.NS.ISMS.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthenticationService {

        @Autowired
        public UserRepository repository;

        @Autowired
        private TokenRepository tokenRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private AuthenticationManager authenticationManager;

        public ResponseEntity<Map<String, String>> register(RegisterRequest request, HttpServletResponse response) {
                
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();
                var savedUser = repository.save(user);
                var jwtToken = jwtService.generateToken(user);
                saveUserToken(savedUser, jwtToken, response);
                Map<String, String> res = new HashMap<>();
                res.put("message", "cookie with JWT token sent successfully..!");
                return ResponseEntity.ok(res);
                // return AuthenticationResponse.builder()
                //                 .accessToken(jwtToken)
                //                 .build();
        }

        public ResponseEntity<Map<String, String>> authenticate(AuthenticationRequest request, HttpServletResponse response) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                System.out.println("yes yes/.!");
                var user = repository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, jwtToken, response);
                Map<String, String> res = new HashMap<>();
                res.put("message", "cookie with JWT token sent successfully..!");
                return ResponseEntity.ok(res);
                // return AuthenticationResponse.builder()
                //                 .accessToken(jwtToken)
                //                 .build();
        }

        private Boolean saveUserToken(User user, String jwtToken, HttpServletResponse response) {
                var token = Token.builder()
                                .user(user)
                                .token(jwtToken)
                                .tokenType(TokenType.BEARER)
                                .expired(false)
                                .revoked(false)
                                .build();
                tokenRepository.save(token);

                System.out.println("------------------------------------");
                System.out.println(jwtToken);
                System.out.println("------------------------------------");
                Cookie cookie = new Cookie("authToken", jwtToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath("/");
                response.addCookie(cookie);

                return true;

        }

        private void revokeAllUserTokens(User user) {
                var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
                if (validUserTokens.isEmpty())
                        return;
                validUserTokens.forEach(token -> {
                        token.setExpired(true);
                        token.setRevoked(true);
                });
                tokenRepository.saveAll(validUserTokens);
        }

}
