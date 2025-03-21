package org.fews.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.fews.backend.model.Console;
import org.fews.backend.model.Game;
import org.fews.backend.model.GameDto;
import org.fews.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final ConsoleService consoleService;

    public GameService(GameRepository gameRepository, ConsoleService consoleService) {
        this.gameRepository = gameRepository;
        this.consoleService = consoleService;
    }

    public Game createGame(GameDto gameDto) throws SQLException {
        return gameRepository.createGame(gameDto).getFirst();
    }

    private void buildGameFullName(List<Game> games) throws SQLException {
        for (Game game : games) {
            UUID consoleId = game.getConsoleId();
            String consoleName = "";
            if (consoleId != null) {
                Console thisConsole = consoleService.getConsole(consoleId);
                consoleName = thisConsole.getName();
            }
            String gameFullName = String.format("%s (%s) [%s]", game.getName(), game.getRegion(), consoleName);
            game.setGameFullName(gameFullName);
        }
    }

    public Game getGame(UUID gameId) throws SQLException {
        List<Game> returnList = gameRepository.getGame(gameId);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("Game ID " + gameId + " not found");
        }
        buildGameFullName(returnList);
        returnList.sort(Comparator.comparing(Game::getName));
        return returnList.getFirst();
    }

    public List<Game> getGamesAll() throws SQLException {
        List<Game> returnList = gameRepository.getGamesAll();
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No games found in database");
        }
        buildGameFullName(returnList);
        returnList.sort(Comparator.comparing(Game::getName));
        return returnList;
    }

    public Game updateGame(UUID gameId, GameDto gameDto) throws SQLException {
        return gameRepository.updateGame(gameId, gameDto).getFirst();
    }

    public Game deleteGame(UUID gameId) throws SQLException {
        return gameRepository.deleteGame(gameId).getFirst();
    }
}
