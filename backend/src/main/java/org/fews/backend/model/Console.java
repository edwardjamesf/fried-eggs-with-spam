package org.fews.backend.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class Console {
    private UUID id;
    private String name;
    private String manufacturer;
    private String releaseDate;
    private String description;
    private UUID imageId;
    private Instant createdTimestamp;
    private Instant modifiedTimestamp;
}
