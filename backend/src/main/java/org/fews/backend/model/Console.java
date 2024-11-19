package org.fews.backend.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Console {
    @NonNull
    private UUID id;
    @NonNull
    private String name;
    private String manufacturer;
    private String releaseDate;
    private String description;
    private String imageId;
}
