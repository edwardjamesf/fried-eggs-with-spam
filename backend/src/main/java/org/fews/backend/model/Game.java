package org.fews.backend.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class Game {
    private UUID id;
    private String name;
    private String developer;
    private String publisher;
    private String region;
    private String releaseDate;
    private String description;
    private UUID imageId;
    private UUID consoleId;
    private Instant createdTimestamp;
    private Instant modifiedTimestamp;
    private String consoleFullName;
    private String gameFullName;
}
