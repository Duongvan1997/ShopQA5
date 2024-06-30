package com.vti.finalexam.DTO;

import com.vti.finalexam.entity.Customer;
import com.vti.finalexam.entity.Feedback;
import com.vti.finalexam.entity.Product;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

public class FeedbackDTO {
    private int id;
    private String comment;
    private LocalDate feedback_date;
    private Feedback.RATING rating;
    private int customer_id;
    private String customer_name;

    private int product_id;

    public String getCustomer_name() {
        return customer_name;
    }

    public void setCustomer_name(String customer_name) {
        this.customer_name = customer_name;
    }

    public FeedbackDTO(int id, String comment, LocalDate feedback_date, Feedback.RATING rating, int customer_id, String customer_name, int product_id) {
        this.id = id;
        this.comment = comment;
        this.feedback_date = feedback_date;
        this.rating = rating;
        this.customer_id = customer_id;
        this.customer_name = customer_name;
        this.product_id = product_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public FeedbackDTO(int id, String comment, LocalDate feedback_date, Feedback.RATING rating, int customer_id, int product_id) {
        this.id =id;
        this.comment = comment;
        this.feedback_date = feedback_date;
        this.rating = rating;
        this.customer_id = customer_id;
        this.product_id = product_id;
    }

    public FeedbackDTO(Feedback feedback) {
        this.id =feedback.getId();
        this.comment = feedback.getComment();
        this.feedback_date = feedback.getFeedback_date();
        this.rating = feedback.getRating();
        this.customer_id = feedback.getAccount_customer().getId();
        if(feedback.getProduct_feedback() != null)
            this.product_id = feedback.getProduct_feedback().getId();
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getFeedback_date() {
        return feedback_date;
    }

    public void setFeedback_date(LocalDate feedback_date) {
        this.feedback_date = feedback_date;
    }

    public Feedback.RATING getRating() {
        return rating;
    }

    public void setRating(Feedback.RATING rating) {
        this.rating = rating;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }
}
