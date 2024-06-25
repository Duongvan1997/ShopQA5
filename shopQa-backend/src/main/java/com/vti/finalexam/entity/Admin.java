package com.vti.finalexam.entity;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@DiscriminatorValue("ADMIN")
public class Admin extends Account{
    public Admin(String username, String phone, String password, String firstName, String lastName, String address, LocalDate birthday, String email, Role role, Gender gender, LocalDate createdDate) {
        super( username, phone, password, firstName, lastName, address, birthday, email, role, gender, createdDate);
    }


    public Admin() {
    }
}
