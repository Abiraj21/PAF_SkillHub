package com.Recipe_Management.Recipe_Management.repo;

import com.Recipe_Management.Recipe_Management.model.MealPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findByUserId(Long useId);
}
