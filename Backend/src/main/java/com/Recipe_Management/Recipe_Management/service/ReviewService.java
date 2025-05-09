package com.Recipe_Management.Recipe_Management.service;

import com.Recipe_Management.Recipe_Management.dto.ReviewDTO;
import com.Recipe_Management.Recipe_Management.model.Recipe;
import com.Recipe_Management.Recipe_Management.model.Review;
import com.Recipe_Management.Recipe_Management.model.User;
import com.Recipe_Management.Recipe_Management.repo.RecipeRepository;
import com.Recipe_Management.Recipe_Management.repo.ReviewRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    public Review addReview(Long userId, Long recipeId, ReviewDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        Review review = new Review();
        review.setUser(user);
        review.setRecipe(recipe);
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    public Review updateReview(Long userId, Long reviewId, ReviewDTO dto) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new RuntimeException("You can only edit your own reviews."));

        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        review.setUpdatedAt(LocalDateTime.now());
        return reviewRepository.save(review);
    }

    public void deleteReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findByIdAndUserId(reviewId, userId)
                .orElseThrow(() -> new RuntimeException("You can only delete your own reviews."));
        reviewRepository.delete(review);
    }

    public List<ReviewDTO> getReviewsByRecipe(Long recipeId) {
        List<Review> reviews = reviewRepository.findByRecipeId(recipeId);

        return reviews.stream()
                .map(review -> new ReviewDTO(
                        review.getId(),
                        review.getComment(),
                        review.getRating(),
                        review.getCreatedAt(),
                        review.getUpdatedAt(),
                        review.getUser().getId()
                ))
                .collect(Collectors.toList()).reversed();
    }
}
