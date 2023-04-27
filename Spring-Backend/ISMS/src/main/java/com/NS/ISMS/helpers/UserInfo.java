package com.NS.ISMS.helpers;

import com.NS.ISMS.data_structures.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserInfo {
    private long id;
    private String name;
    private String email;
    private String password;
    private Role role;
}
