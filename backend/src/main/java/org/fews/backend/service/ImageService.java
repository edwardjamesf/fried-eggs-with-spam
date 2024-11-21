package org.fews.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.fews.backend.model.Image;
import org.fews.backend.model.ImageDto;
import org.fews.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image createImage(ImageDto imageDto) throws SQLException {
        return imageRepository.createImage(imageDto).getFirst();
    }

    public Image getImage(UUID imageId) throws SQLException {
        List<Image> returnList = imageRepository.getImage(imageId);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("Image ID " + imageId + " not found");
        }
        return returnList.getFirst();
    }

    public List<Image> getImagesAll() throws SQLException {
        List<Image> returnList = imageRepository.getImagesAll();
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No images found in database");
        }
        return returnList;
    }

    public List<Image> getImagesLimit(int limit) throws SQLException {
        List<Image> returnList = imageRepository.getImagesLimit(limit);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No images found in database");
        }
        return returnList;
    }

    public Image updateImage(UUID imageId, ImageDto imageDto) throws SQLException {
        return imageRepository.updateImage(imageId, imageDto).getFirst();
    }

    public Image deleteImage(UUID imageId) throws SQLException {
        return imageRepository.deleteImage(imageId).getFirst();
    }
}
