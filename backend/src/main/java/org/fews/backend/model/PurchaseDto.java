package org.fews.backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.math.BigDecimal;
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
    private BigDecimal costBase;
    @Schema(description = "Tax paid on purchase", example = "10.38")
    private BigDecimal costTax;
    @Schema(description = "Shipping costs of purchase", example = "0.0")
    private BigDecimal costShipping;
    @Schema(description = "Other fees paid pertaining to the purchase", example = "0.0")
    private BigDecimal costOther;
    @Schema(description = "Where the purchase was made from", example = "Ebay")
    private String purchaseFrom;
    @Schema(description = "Notes about the purchase", example = "Grey Japanese model 1. Includes power and composite A/V cables, 1 controller, and Vampire Hunter (JP) game")
    private String notes;
    @Schema(description = "ID of the associated image, if applicable", example = "00000000-0000-0000-0000-000000000000")
    private UUID imageId;
    @Schema(description = "ID of the associated console, if applicable", example = "00000000-0000-0000-0000-000000000000")
    private UUID consoleId;
    @Schema(description = "ID of the associated game, if applicable", example = "00000000-0000-0000-0000-000000000000")
    private UUID gameId;
}
