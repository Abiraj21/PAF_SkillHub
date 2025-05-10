package com.Recipe_Management.Recipe_Management.service;

import com.Recipe_Management.Recipe_Management.model.ProfilePicture;
import com.Recipe_Management.Recipe_Management.model.User;
import com.Recipe_Management.Recipe_Management.repo.ProfilePictureRepository;
import com.Recipe_Management.Recipe_Management.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ProfilePictureService {

    @Autowired
    private UserRepository userRepo;
    @Value("${profile-pic.upload-dir}")
    private String uploadDir;

    private final ProfilePictureRepository pictureRepository;

    public ProfilePictureService(ProfilePictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    public void saveProfilePicture(Long userId, MultipartFile file) throws IOException {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Ensure upload directory exists
        File uploadPath = new File(uploadDir);
        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadDir).resolve(fileName);
        Files.copy(file.getInputStream(), path);

        ProfilePicture picture = new ProfilePicture(userId, fileName);
        pictureRepository.save(picture);
    }

    public byte[] getProfilePicture(Long userId) throws IOException {
        ProfilePicture picture = pictureRepository.findTopByUserIdOrderByUploadTimeDesc(userId)
                .orElseThrow(() -> new FileNotFoundException("No profile picture found"));

        Path path = Paths.get(uploadDir).resolve(picture.getFileName());
        return Files.readAllBytes(path);
    }

    public String getProfilePictureFileName(Long userId) {
        return pictureRepository.findTopByUserIdOrderByUploadTimeDesc(userId)
                .map(ProfilePicture::getFileName)
                .orElse(null);
    }
}
