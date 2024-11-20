package org.fews.backend.repository;

import org.fews.backend.model.Image;
import org.fews.backend.model.ImageDto;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class ImageRepository {
    private final JdbcTemplate template;

    public ImageRepository(JdbcTemplate template) {
        this.template = template;
    }

    public static class ImageExtractor implements ResultSetExtractor<List<Image>> {
        @Override
        public List<Image> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
            List<Image> images = new ArrayList<>();
            while (resultSet.next()) {
                Image image = Image.builder()
                        .id((UUID) resultSet.getObject("id"))
                        .name(resultSet.getString("name"))
                        .description(resultSet.getString("description"))
                        .path(resultSet.getString("path"))
                        .build();

                images.add(image);
            }
            return images;
        }
    }

    public List<Image> createImage(ImageDto imageDto) throws SQLException {
        try {
            String sql = "select * from insert_image(?, ?, ?)";
            return template.query(
                    sql,
                    new ImageExtractor(),
                    imageDto.getName(),
                    imageDto.getDescription(),
                    imageDto.getPath()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Create image query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not create image record: " + e.getMessage());
        }
    }

    public List<Image> getImage(UUID imageId) throws SQLException {
        try {
            String sql = "select * from fetch_image(?)";
            return template.query(
                    sql,
                    new ImageExtractor(),
                    imageId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch image query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch image record: " + e.getMessage());
        }
    }

    public List<Image> updateImage(UUID imageId, ImageDto imageDto) throws SQLException {
        try {
            String sql = "select * from update_image(?, ?, ?, ?)";
            return template.query(
                    sql,
                    new ImageExtractor(),
                    imageId,
                    imageDto.getName(),
                    imageDto.getDescription(),
                    imageDto.getPath()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Update image query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not update image record: " + e.getMessage());
        }
    }

    public List<Image> deleteImage(UUID imageId) throws SQLException {
        try {
            String sql = "select * from delete_image(?,)";
            return template.query(
                    sql,
                    new ImageExtractor(),
                    imageId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Delete image query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not delete image record: " + e.getMessage());
        }
    }
}
