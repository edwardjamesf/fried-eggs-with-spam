package org.fews.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.UUID;

@Schema(name = "PurchaseDto", description = "Input required for adding purchases to database")
@Data
@Builder
public class PurchaseDto {
    @Schema(description = "Name of purchase", example = "Sega Saturn")
    @NotNull
    @NonNull
    private String name;
    @Schema(description = "Date of purchase, in YYYY-MM-DD format", example = "2021-01-19")
    private String purchaseDate;
    @Schema(description = "Base cost of purchase", example = "133.99")
    private double costBase;
    @Schema(description = "Tax paid on purchase", example = "10.38")
    private double costTax;
    @Schema(description = "Shipping costs of purchase", example = "0.0")
    private double costShipping;
    @Schema(description = "Other fees paid pertaining to the purchase", example = "0.0")
    private double costOther;
    @Schema(description = "Notes about the purchase", example = "Grey Japanese model 1. Includes power and composite A/V cables, 1 controller, and Vampire Hunter (JP) game")
    private String notes;
    @Schema(description = "ID of the associated image, if applicable", example = "24695b27-8093-46d3-b51e-f83687093342")
    private UUID imageId;
    @Schema(description = "ID of the associated console, if applicable", example = "24695b27-8093-46d3-b51e-f83687093342")
    private UUID consoleId;
    @Schema(description = "ID of the associated game, if applicable", example = "24695b27-8093-46d3-b51e-f83687093342")
    private UUID gameId;
}
