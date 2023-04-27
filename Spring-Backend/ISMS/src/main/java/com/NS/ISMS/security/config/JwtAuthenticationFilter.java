package com.NS.ISMS.security.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.NS.ISMS.repository.TokenRepository;
import com.NS.ISMS.security.service.JwtService;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private final UserDetailsService userDetailsService;

    @Autowired
    private TokenRepository tokenRepository;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/auth/");
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // final String authHeader = request.getHeader("Authorization");
        // final String jwt;
        // final String userEmail;
        // if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        // filterChain.doFilter(request, response);
        // return;
        // }
        // jwt = authHeader.substring(7);
        // userEmail = jwtService.extractUsername(jwt);

        // Get the cookie value using the HttpServletRequest object
        String jwt = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            System.out.println("cookies present");
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName());
                if (cookie.getName().equals("authToken")) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        // if (jwt== null) {
        //  filterChain.doFilter(request, response);
        // }

        System.out.println(jwt);
        if (/* jwt.equals(authTokenFromCookie) && userEmail != null */ jwt != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            String userEmail = jwtService.extractUsername(jwt);
            System.out.println("yes jwt token matches with cookie token");

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
            if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        if (jwt != null && SecurityContextHolder.getContext().getAuthentication() != null) {
            System.out.println("---------------------------");
            String userEmail = jwtService.extractUsername(jwt);
            System.out.println(userEmail);
            System.out.println(request.getParameter("email"));
            System.out.println(userEmail.equals(request.getParameter("email")));
            System.out.println(userEmail.equals(SecurityContextHolder.getContext().getAuthentication().getName()));
            System.out.println("---------------------------");

            if (/* !userEmail.equals(request.getParameter("email")) || */ !userEmail
                    .equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                filterChain.doFilter(request, response);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}
