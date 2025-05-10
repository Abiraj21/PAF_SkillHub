package com.Recipe_Management.Recipe_Management.dto;

import java.time.LocalDateTime;

public class ReviewDTO {
    private String comment;
    private int rating;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Long userId;
    private Long recipeId;


    public ReviewDTO(Long id, String comment, int rating, LocalDateTime createdAt, LocalDateTime updatedAt, Long userId) {
        this.comment = comment;
        this.rating = rating;
        this.createdDate = createdAt;
        this.updatedDate = updatedAt;
        this.userId = userId;

    }

    public String getComment() {
        return comment;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Long recipeId) {
        this.recipeId = recipeId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }
}

