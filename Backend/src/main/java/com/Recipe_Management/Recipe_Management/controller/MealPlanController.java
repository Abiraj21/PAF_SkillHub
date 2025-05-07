package com.Recipe_Management.Recipe_Management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Recipe_Management.Recipe_Management.service.MealPlanService;

@RestController
@RequestMapping("/meal")
public class MealPlanController {
    @Autowired
    private MealPlanService mealPlanService;
    
}

