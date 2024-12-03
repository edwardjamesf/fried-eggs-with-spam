package org.fews.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Schema(name = "CreateGameDto", description = "Input required for creating game data")
@Data
@Builder
public class GameDto {
    @Schema(description = "Name of the game. Required.", example = "Super Mario Bros 3")
    @NotNull
    @NonNull
    private String name;
    @Schema(description = "Developer of the game.", example = "Nintendo")
    private String developer;
    @Schema(description = "Publisher of the game.", example = "Nintendo")
    private String publisher;
    @Schema(description = "Region of the game.", example = "North America")
    private String region;
    @Schema(description = "Release date of the game in YYYY-MM-DD format.", example = "1990-02-12")
    private String releaseDate;
    @Schema(description = "Descriptive text about the game.", example = "It's Super Mario Bros 3 for the NES.")
    private String description;
    @Schema(description = "Database UUID of the associated image.", example = "24695b27-8093-46d3-b51e-f83687093342")
    private UUID imageId;
    @Schema(description = "Database UUID of the associated console.", example = "d1e1445d-6c65-44bc-98ee-aa11fef49e19")
    private UUID consoleId;
}
