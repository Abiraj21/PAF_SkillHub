package com.Recipe_Management.Recipe_Management.controller;

import com.Recipe_Management.Recipe_Management.service.ProfilePictureService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/profile-picture")
public class ProfilePictureController {

    private final ProfilePictureService pictureService;

    public ProfilePictureController(ProfilePictureService pictureService) {
        this.pictureService = pictureService;
    }

    @PutMapping("/upload/{userId}")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long userId,
                                                       @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("No file uploaded", HttpStatus.BAD_REQUEST);
        }

        try {
            pictureService.saveProfilePicture(userId, file);
            return ResponseEntity.ok("Profile picture uploaded successfully");
        } catch (IOException e) {
            return new ResponseEntity<>("Upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long userId) {
        try {
            byte[] image = pictureService.getProfilePicture(userId);
            String fileName = pictureService.getProfilePictureFileName(userId);
            Path path = Paths.get("uploads").resolve(fileName);
            String contentType = Files.probeContentType(path);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(image);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
