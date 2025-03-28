package org.fews.backend.model;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class Purchase {
    private UUID id;
    private String name;
    private String purchaseDate;
    private double costBase;
    private double costTax;
    private double costShipping;
    private double costOther;
    private double costTotal;
    private String purchaseFrom;
    private String notes;
    private UUID imageId;
    private UUID consoleId;
    private UUID gameId;
    private Instant createdTimestamp;
    private Instant modifiedTimestamp;
}
