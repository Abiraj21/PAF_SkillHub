package com.Recipe_Management.Recipe_Management.service;

import com.Recipe_Management.Recipe_Management.dto.CookingTechniqueDTO;
import com.Recipe_Management.Recipe_Management.model.CookingTechnique;
import com.Recipe_Management.Recipe_Management.model.User;
import com.Recipe_Management.Recipe_Management.repo.CookingTechniqueRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CookingTechniqueService {
    private static final String UPLOAD_DIR = "uploads/";
    @Autowired
    private CookingTechniqueRepository cookingTechniqueRepository;
    @Autowired
    private UserRepository userRepository;

    public CookingTechnique saveTechniquewithFiles( CookingTechniqueDTO dto) throws IOException{

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<String> filePaths = new ArrayList<>();
        /*for (MultipartFile file:files){
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Path.of(UPLOAD_DIR +fileName);
            Files.createDirectories((filePath.getParent()));
            Files.write(filePath,file.getBytes());
            filePaths.add (filePath.toString());
        }*/
        CookingTechnique cookingTechnique =  new CookingTechnique();
        cookingTechnique.setName(dto.getName());
        cookingTechnique.setDescription(dto.getDescription());
        //cookingTechnique.setMediaPaths(filePaths);
        cookingTechnique.setUser(user);

        return cookingTechniqueRepository.save(cookingTechnique);
    }


    public CookingTechnique updateTechnique(Long techniqueId, CookingTechniqueDTO dto) {
        CookingTechnique technique = cookingTechniqueRepository.findById(techniqueId)
                .orElseThrow(() -> new RuntimeException("Cooking technique not found"));

        technique.setName(dto.getName());
        technique.setDescription(dto.getDescription());
        return cookingTechniqueRepository.save(technique);
    }


    public void deleteTechnique(Long techniqueId) {
        if (!cookingTechniqueRepository.existsById(techniqueId)) {
            throw new RuntimeException("Technique not found");
        }
        cookingTechniqueRepository.deleteById(techniqueId);
    }


    public List<CookingTechnique> findByName(String name) {
        return cookingTechniqueRepository.findByNameContainingIgnoreCase(name);
    }


    public CookingTechnique getById(Long id) {
        return cookingTechniqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Technique not found"));
    }
    public List<CookingTechnique> getAllCookingTechnique(){
        return cookingTechniqueRepository.findAll();
    }
}
