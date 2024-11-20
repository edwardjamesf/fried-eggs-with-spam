package org.fews.backend.model;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class Game {
    private UUID id;
    private String name;
    private String developer;
    private String publisher;
    private String releaseDate;
    private String description;
    private UUID imageId;
    private UUID consoleId;
}
