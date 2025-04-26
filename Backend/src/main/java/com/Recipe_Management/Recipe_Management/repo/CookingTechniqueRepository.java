package com.Recipe_Management.Recipe_Management.repo;

import com.Recipe_Management.Recipe_Management.model.CookingTechnique;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CookingTechniqueRepository extends JpaRepository<CookingTechnique, Long> {
    List<CookingTechnique> findByNameContainingIgnoreCase(String name);
    List<CookingTechnique> findByUserId(Long userID);

}
