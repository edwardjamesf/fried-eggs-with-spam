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
import org.fews.backend.model.Game;
import org.fews.backend.model.GameDto;
import org.fews.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.UUID;

@RestController
@RequestMapping("/games")
@Tag(name = "GameController")
public class GameController {
    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping(produces = "application/json")
    @Operation(summary = "Create game data", description = "Creates new game data")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game Data Successfully Created", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Game.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve game record: [message]\"\n}")))
    })
    public ResponseEntity<Game> createGame(@Valid() @RequestBody GameDto gameDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(gameService.createGame(gameDto));
    }

    @GetMapping(value = "/{gameId}", produces = "application/json")
    @Operation(summary = "Retrieve game data", description = "Retrieves game data by its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game Data Successfully Retrieved", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Game.class)))),
            @ApiResponse(responseCode = "404", description = "Game Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Game ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not retrieve game record: [message]\"\n}")))
    })
    public ResponseEntity<Game> getGame(@PathVariable UUID gameId) throws SQLException {
        return ResponseEntity.ok(gameService.getGame(gameId));
    }

    @PutMapping(value = "/{gameId}", produces = "application/json")
    @Operation(summary = "Update game data", description = "Updates existing game data given its database ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game Data Successfully Updated", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Game.class)))),
            @ApiResponse(responseCode = "400", description = "User Error Occurred", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Missing required body parameters: [???]\"\n}"))),
            @ApiResponse(responseCode = "404", description = "Game Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Game ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not update game record: [message]\"\n}")))})
    public ResponseEntity<Game> updateGame(@PathVariable UUID gameId, @Valid() @RequestBody GameDto gameDto, BindingResult bindingResult) throws SQLException {
        return ResponseEntity.ok(gameService.updateGame(gameId, gameDto));
    }

    @DeleteMapping(value = "/{gameId}", produces = "application/json")
    @Operation(summary = "Delete game data", description = "Deletes an existing game data entry by its database ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game Data Successfully Deleted", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Game.class)))),
            @ApiResponse(responseCode = "404", description = "Game Not Found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Game ID [UUID] not found\"\n}"))),
            @ApiResponse(responseCode = "500", description = "Internal Database Error", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n  \"message\": \"Internal Database Error: Could not delete game record: [message]\"\n}")))})
    public ResponseEntity<Game> deleteGame(@PathVariable UUID gameId) throws SQLException{
        return ResponseEntity.ok(gameService.deleteGame(gameId));
    }

}
