package com.Recipe_Management.Recipe_Management.controller;

import com.Recipe_Management.Recipe_Management.dto.CookingTechniqueDTO;
import com.Recipe_Management.Recipe_Management.model.CookingTechnique;
import com.Recipe_Management.Recipe_Management.service.CookingTechniqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/techniques")
public class CookingTechniqueController {
    @Autowired
    private CookingTechniqueService service;

    @PostMapping(value = "/add")
    public ResponseEntity<CookingTechnique> uploadTechnique(@RequestBody CookingTechniqueDTO dto
                                                            ) {
        try {
            CookingTechnique technique = service.saveTechniquewithFiles(dto);
            return ResponseEntity.ok(technique);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<CookingTechnique> updateTechnique(@PathVariable Long id,
                                                            @RequestBody CookingTechniqueDTO dto) {
        return ResponseEntity.ok(service.updateTechnique(id, dto));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTechnique(@PathVariable Long id) {
        service.deleteTechnique(id);
        return ResponseEntity.ok("Cooking technique deleted successfully.");
    }
    @GetMapping("/search")
    public ResponseEntity<List<CookingTechnique>> findByName(@RequestParam String name) {
        List<CookingTechnique> techniques = service.findByName(name);
        if (techniques.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        return ResponseEntity.ok(techniques);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CookingTechnique> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        List<CookingTechnique> cookingTechniques = service.getAllCookingTechnique();
        if(cookingTechniques.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No Cooking Techniques available.");
        }
        return ResponseEntity.ok(cookingTechniques);
    }
}
