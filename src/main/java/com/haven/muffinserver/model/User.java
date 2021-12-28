package com.haven.muffinserver.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    private long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private Collection<Role> roles;
}
