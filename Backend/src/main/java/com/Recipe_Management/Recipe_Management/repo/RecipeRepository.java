package com.Recipe_Management.Recipe_Management.repo;
import com.Recipe_Management.Recipe_Management.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByRecipeNameContainingIgnoreCase(String recipeName);
}
