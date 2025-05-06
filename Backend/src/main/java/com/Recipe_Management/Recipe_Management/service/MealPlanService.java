package com.Recipe_Management.Recipe_Management.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.Recipe_Management.Recipe_Management.dto.MealPlanDTO;
import com.Recipe_Management.Recipe_Management.model.MealPlan;
import com.Recipe_Management.Recipe_Management.model.User;
import com.Recipe_Management.Recipe_Management.repo.MealPlanRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;

public class MealPlanService {
    @Autowired
    private MealPlanRepository mealPlanRepository;
    @Autowired
    private UserRepository userRepository;

    public MealPlan addMealPlan(MealPlanDTO mealPlanDTO)throws IOException {
        User user = userRepository.findById(mealPlanDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        MealPlan mealPlan = new MealPlan();
        mealPlan.setMonday(mealPlanDTO.getMonday());
        mealPlan.setTuesday(mealPlanDTO.getTuesday());
        mealPlan.setWednesday(mealPlanDTO.getWednesday());
        mealPlan.setThursday(mealPlanDTO.getThursday());
        mealPlan.setFriday(mealPlanDTO.getFriday());
        mealPlan.setSaturday(mealPlanDTO.getSaturday());
        mealPlan.setSunday(mealPlanDTO.getSunday());
        mealPlan.setUser(user);

        return mealPlanRepository.save(mealPlan);
    }

    public MealPlan updateMeal(Long mealPlanId, MealPlanDTO mealPlanDTO) {
        MealPlan mealPlan = mealPlanRepository.findById(mealPlanId)
                .orElseThrow(() -> new RuntimeException("No meal plan found."));
        mealPlan.setMonday(mealPlanDTO.getMonday());
        mealPlan.setTuesday(mealPlanDTO.getTuesday());
        mealPlan.setWednesday(mealPlanDTO.getWednesday());
        mealPlan.setThursday(mealPlanDTO.getThursday());
        mealPlan.setFriday(mealPlanDTO.getFriday());
        mealPlan.setSaturday(mealPlanDTO.getSaturday());
        mealPlan.setSunday(mealPlanDTO.getSunday());
        return mealPlanRepository.save(mealPlan);
    }

    public List<MealPlan> getPlansByUser(Long userId) {
        return mealPlanRepository.findByUserId(userId);
    }

    public void deleteMealPlan(Long id) {
        mealPlanRepository.deleteById(id);
    }
}
