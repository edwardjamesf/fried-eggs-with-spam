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
import org.fews.backend.model.Console;
import org.fews.backend.model.ConsoleDto;
import org.fews.backend.service.ConsoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.UUID;

@RestController
@RequestMapping("/consoles")
@Tag(name = "ConsoleController")
public class ConsoleController {
    private final ConsoleService consoleService;

    public ConsoleController(ConsoleService consoleService) {
        this.consoleService = consoleService;
    }

    @PostMapping(produces = "application/json")
    @Operation(summary = "Create console data", description = "Creates new console data")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Console Data Successfully Created", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Console.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve console record: [message]\"\n}")))
    })
    public ResponseEntity<Console> createConsole(@Valid() @RequestBody ConsoleDto consoleDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(consoleService.createConsole(consoleDto));
    }

    @GetMapping(value = "/{consoleId}", produces = "application/json")
    @Operation(summary = "Retrieve console data", description = "Retrieves console data by its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Console Data Successfully Retrieved", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Console.class)))),
            @ApiResponse(responseCode = "404", description = "Console Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Console ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve console record: [message]\"\n}")))
    })
    public ResponseEntity<Console> getConsole(@PathVariable UUID consoleId) throws SQLException {
        return ResponseEntity.ok(consoleService.getConsole(consoleId));
    }

    @PutMapping(value = "/{consoleId}", produces = "application/json")
    @Operation(summary = "Update console data", description = "Updates existing console data given its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Console Data Successfully Updated", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Console.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "404", description = "Console Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Console ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not update console record: [message]\"\n}")))})
    public ResponseEntity<Console> updateConsole(@PathVariable UUID consoleId, @Valid() @RequestBody ConsoleDto consoleDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(consoleService.updateConsole(consoleId, consoleDto));
    }

    @DeleteMapping(value = "/{consoleId}", produces = "application/json")
    @Operation(summary = "Delete console data", description = "Deletes an existing console data entry by its database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Console Data Successfully Deleted", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Console.class)))),
            @ApiResponse(responseCode = "404", description = "Console Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Console ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not delete console record: [message]\"\n}")))})
    public ResponseEntity<Console> deleteConsole(@PathVariable UUID consoleId) throws SQLException{
        return ResponseEntity.ok(consoleService.deleteConsole(consoleId));
    }

}
