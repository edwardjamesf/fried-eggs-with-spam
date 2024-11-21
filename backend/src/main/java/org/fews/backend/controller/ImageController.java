package org.fews.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.fews.backend.model.Image;
import org.fews.backend.model.ImageDto;
import org.fews.backend.service.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/images")
@Tag(name = "ImageController")
public class ImageController {
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(produces = "application/json")
    @Operation(summary = "Add image", description = "Adds new image to database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Image.class))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve image record: [message]\"\n}")))
    })
    public ResponseEntity<Image> createImage(@Valid() @RequestBody ImageDto imageDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(imageService.createImage(imageDto));
    }

    @GetMapping(value = "/{imageId}", produces = "application/json")
    @Operation(summary = "Retrieve image data", description = "Retrieves image data by its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Image.class))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Image ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve image record: [message]\"\n}")))
    })
    public ResponseEntity<Image> getImage(@PathVariable UUID imageId) throws SQLException {
        return ResponseEntity.ok(imageService.getImage(imageId));
    }

    @GetMapping(value = "/all", produces = "application/json")
    @Operation(summary = "Retrieve multiple image data", description = "Retrieves multiple image data in the database. Results can be limited via query parameter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Image.class)))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"No images found in database\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve image records: [message]\"\n}")))
    })
    public ResponseEntity<List<Image>> getImagesAll(@RequestParam(required = false) Integer limit) throws SQLException {
        if (limit == null) {
            return ResponseEntity.ok(imageService.getImagesAll());
        } else {
            return ResponseEntity.ok(imageService.getImagesLimit(limit));
        }
    }

    @PutMapping(value = "/{imageId}", produces = "application/json")
    @Operation(summary = "Update image data", description = "Updates existing image data given its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Image.class))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Image ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not update image record: [message]\"\n}")))})
    public ResponseEntity<Image> updateImage(@PathVariable UUID imageId, @Valid() @RequestBody ImageDto imageDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(imageService.updateImage(imageId, imageDto));
    }

    @DeleteMapping(value = "/{imageId}", produces = "application/json")
    @Operation(summary = "Delete image data", description = "Deletes an existing image data entry by its database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Image.class))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Image ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not delete image record: [message]\"\n}")))})
    public ResponseEntity<Image> deleteImage(@PathVariable UUID imageId) throws SQLException{
        return ResponseEntity.ok(imageService.deleteImage(imageId));
    }

}
