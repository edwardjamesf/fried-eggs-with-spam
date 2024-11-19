package org.fews.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.fews.backend.model.Console;
import org.fews.backend.service.ConsoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(value = "/{consoleId}", produces = "application/json")
    @Operation(summary = "Retrieve console data", description = "Retrieves console data by its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Console Data Successfully Retrieved", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Console.class)))),
            @ApiResponse(responseCode = "404", description = "Console Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Console ID# 12345 not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve console record: [message]\"\n}")))}
    )
    public ResponseEntity<Console> getConsole(@PathVariable UUID consoleId) throws SQLException {
        return ResponseEntity.ok(consoleService.getConsole(consoleId));
    }
}
