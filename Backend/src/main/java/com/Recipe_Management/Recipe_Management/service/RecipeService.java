package com.Recipe_Management.Recipe_Management.service;
import java.util.List;
import com.Recipe_Management.Recipe_Management.dto.RecipeDTO;
import com.Recipe_Management.Recipe_Management.model.Recipe;


public interface RecipeService {
    Recipe saveRecipe(RecipeDTO dto);
    List<Recipe> getAllRecipes();
    List<Recipe> findByName(String name);
    Recipe updateRecipe(Long id, RecipeDTO dto);
    void deleteRecipe(Long id);
}

