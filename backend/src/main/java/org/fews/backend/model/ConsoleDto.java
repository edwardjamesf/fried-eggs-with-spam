package org.fews.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Schema(name = "CreateConsoleDto", description = "Input required for creating console data")
@Data
@Builder
public class ConsoleDto {
    @Schema(description = "Name of the console. Required.", example = "NES")
    @NotNull
    @NonNull
    private String name;
    @Schema(description = "Manufacturer of the console.", example = "Nintendo")
    private String manufacturer;
    @Schema(description = "Release date of the console in YYYY-MM-DD format.", example = "1985-10-18")
    private String releaseDate;
    @Schema(description = "Descriptive text about the console.", example = "It's the NES.")
    private String description;
    @Schema(description = "Database UUID of the associated image.", example = "24695b27-8093-46d3-b51e-f83687093342")
    private UUID imageId;
}
