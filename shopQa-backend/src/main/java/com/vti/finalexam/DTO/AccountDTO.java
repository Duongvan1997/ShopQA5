package com.vti.finalexam.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vti.finalexam.entity.Account;

import java.time.LocalDate;
import java.util.Date;

public class AccountDTO {
    private String username;
    private String lastName;
    private  String firstName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createdDate;
    private Account.Role role;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Account.Gender getGender() {
        return gender;
    }

    public void setGender(Account.Gender gender) {
        this.gender = gender;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    private  String email;
    private Account.Gender gender;
    private Long id;

    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public Account.Role getRole() {
        return role;
    }

    public AccountDTO(String username, String lastName, LocalDate createdDate, Account.Role role) {
        this.username = username;
        this.lastName = lastName;
        this.createdDate = createdDate;
        this.role = role;
    }

    public AccountDTO(String username, String lastName,String firstName, LocalDate createdDate, Account.Role role, String email, long id, Account.Gender gender) {
    this.username=username;
    this.lastName=lastName;
    this.firstName=firstName;
    this.createdDate=createdDate;
    this.role=role;
    this.email=email;
    this.id=id;
    this.gender=gender;
    }
}
