package com.Recipe_Management.Recipe_Management.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.Recipe_Management.Recipe_Management.repo.MealPlanRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;

public class MealPlanService {
    @Autowired
    private MealPlanRepository mealPlanRepository;
    @Autowired
    private UserRepository userRepository;
}
