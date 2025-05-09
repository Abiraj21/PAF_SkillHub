package com.Recipe_Management.Recipe_Management.controller;

import com.Recipe_Management.Recipe_Management.dto.ReviewDTO;
import com.Recipe_Management.Recipe_Management.model.Review;
import com.Recipe_Management.Recipe_Management.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add/{recipeId}")
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO dto,
                                            @RequestParam Long userId,
                                            @PathVariable Long recipeId) {
        return ResponseEntity.ok(reviewService.addReview(userId, recipeId, dto));
    }

    @PutMapping("/update/{reviewId}")
    public ResponseEntity<?> updateReview(@RequestBody ReviewDTO dto,
                                               @RequestParam Long userId,
                                               @PathVariable Long reviewId) {
        reviewService.updateReview(userId, reviewId, dto);
        return ResponseEntity.ok("Review updated successfully");
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@RequestParam Long userId,
                                          @PathVariable Long reviewId) {
        reviewService.deleteReview(userId, reviewId);
        return ResponseEntity.ok("Review deleted successfully");
    }

    @GetMapping("/{recipeId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByRecipe(@PathVariable Long recipeId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByRecipe(recipeId);
        if (reviews.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(reviews);
    }
}

