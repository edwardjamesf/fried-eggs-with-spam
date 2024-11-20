package org.fews.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Schema(name = "ImageDto", description = "Input required for adding images to database")
@Data
@Builder
public class ImageDto {
    @Schema(description = "Filename of the image", example = "console_nes.png")
    @NotNull
    @NonNull
    private String name;
    @Schema(description = "Alt-text for the image", example = "Nintendo NES console with controllers")
    private String description;
    @Schema(description = "Path to file, if it is stored in a non-standard location", example = "")
    private String path;
}
