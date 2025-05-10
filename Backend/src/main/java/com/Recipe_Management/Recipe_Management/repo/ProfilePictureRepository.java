package com.Recipe_Management.Recipe_Management.repo;

import com.Recipe_Management.Recipe_Management.model.ProfilePicture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {
    Optional<ProfilePicture> findTopByUserIdOrderByUploadTimeDesc(Long userId);
}
