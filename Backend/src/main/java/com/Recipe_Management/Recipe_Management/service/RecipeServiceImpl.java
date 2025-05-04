package com.Recipe_Management.Recipe_Management.service;
import com.Recipe_Management.Recipe_Management.dto.RecipeDTO;
import com.Recipe_Management.Recipe_Management.model.Recipe;
import com.Recipe_Management.Recipe_Management.model.User;
import com.Recipe_Management.Recipe_Management.repo.RecipeRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class RecipeServiceImpl implements RecipeService {
    @Autowired
    private RecipeRepository recipeRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Recipe saveRecipe(RecipeDTO dto) {
        User user = new User();
        user.setId(dto.getUserId());

        Recipe recipe = new Recipe();
        recipe.setRecipeName(dto.getRecipeName());
        recipe.setIngredients(dto.getIngredients());
        recipe.setInstructions(dto.getInstructions());
        recipe.setCookingTime(dto.getCookingTime());
        recipe.setUser(user);

        return recipeRepo.save(recipe);
    }

    @Override
    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }

    @Override
    public List<Recipe> findByName(String name) {
        return recipeRepo.findByRecipeNameContainingIgnoreCase(name);
    }

    @Override
    public Recipe updateRecipe(Long id, RecipeDTO dto) {
        Recipe recipe = recipeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipe.setRecipeName(dto.getRecipeName());
        recipe.setIngredients(dto.getIngredients());
        recipe.setInstructions(dto.getInstructions());
        recipe.setCookingTime(dto.getCookingTime());

        return recipeRepo.save(recipe);
    }

    @Override
    public void deleteRecipe(Long id) {
        recipeRepo.deleteById(id);
    }
}
