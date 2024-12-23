package org.fews.backend.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class Image {
    private UUID id;
    private String name;
    private String description;
    private String path;
    private Instant createdTimestamp;
    private Instant modifiedTimestamp;
}
