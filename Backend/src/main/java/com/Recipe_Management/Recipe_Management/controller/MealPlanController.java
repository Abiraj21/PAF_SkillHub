package com.Recipe_Management.Recipe_Management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Recipe_Management.Recipe_Management.dto.MealPlanDTO;
import com.Recipe_Management.Recipe_Management.model.MealPlan;
import com.Recipe_Management.Recipe_Management.service.MealPlanService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/meal")
public class MealPlanController {
    @Autowired
    private MealPlanService mealPlanService;
    
    @PostMapping("/add")
    public ResponseEntity<MealPlan> addMealPlan(@RequestBody MealPlanDTO dto) {
        try {
            MealPlan mealPlan = mealPlanService.addMealPlan(dto);
            return ResponseEntity.ok(mealPlan);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MealPlan> updateMealPlan(@RequestBody MealPlanDTO dto, @PathVariable Long id) {
        return ResponseEntity.ok(mealPlanService.updateMeal(id, dto));
    }
}

