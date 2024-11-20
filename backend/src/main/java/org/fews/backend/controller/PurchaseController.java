package org.fews.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.fews.backend.model.Purchase;
import org.fews.backend.model.PurchaseDto;
import org.fews.backend.service.PurchaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.UUID;

@RestController
@RequestMapping("/purchases")
@Tag(name = "PurchaseController")
public class PurchaseController {
    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping(produces = "application/json")
    @Operation(summary = "Add purchase", description = "Adds new purchase to database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Purchase.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve purchase record: [message]\"\n}")))
    })
    public ResponseEntity<Purchase> createPurchase(@Valid() @RequestBody PurchaseDto purchaseDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(purchaseService.createPurchase(purchaseDto));
    }

    @GetMapping(value = "/{purchaseId}", produces = "application/json")
    @Operation(summary = "Retrieve purchase data", description = "Retrieves purchase data by its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Purchase.class)))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Purchase ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve purchase record: [message]\"\n}")))
    })
    public ResponseEntity<Purchase> getPurchase(@PathVariable UUID purchaseId) throws SQLException {
        return ResponseEntity.ok(purchaseService.getPurchase(purchaseId));
    }

    @PutMapping(value = "/{purchaseId}", produces = "application/json")
    @Operation(summary = "Update purchase data", description = "Updates existing purchase data given its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Purchase.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Purchase ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not update purchase record: [message]\"\n}")))})
    public ResponseEntity<Purchase> updatePurchase(@PathVariable UUID purchaseId, @Valid() @RequestBody PurchaseDto purchaseDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(purchaseService.updatePurchase(purchaseId, purchaseDto));
    }

    @DeleteMapping(value = "/{purchaseId}", produces = "application/json")
    @Operation(summary = "Delete purchase data", description = "Deletes an existing purchase data entry by its database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Purchase.class)))),
            @ApiResponse(responseCode = "404", description = "Entity Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Purchase ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not delete purchase record: [message]\"\n}")))})
    public ResponseEntity<Purchase> deletePurchase(@PathVariable UUID purchaseId) throws SQLException{
        return ResponseEntity.ok(purchaseService.deletePurchase(purchaseId));
    }

}
