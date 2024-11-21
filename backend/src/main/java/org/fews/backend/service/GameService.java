package org.fews.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.fews.backend.model.Game;
import org.fews.backend.model.GameDto;
import org.fews.backend.repository.GameRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public class GameService {
    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game createGame(GameDto gameDto) throws SQLException {
        return gameRepository.createGame(gameDto).getFirst();
    }

    public Game getGame(UUID gameId) throws SQLException {
        List<Game> returnList = gameRepository.getGame(gameId);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("Game ID " + gameId + " not found");
        }
        return returnList.getFirst();
    }

    public List<Game> getGamesAll() throws SQLException {
        List<Game> returnList = gameRepository.getGamesAll();
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No games found in database");
        }
        return returnList;
    }

    public List<Game> getGamesLimit(int limit) throws SQLException {
        List<Game> returnList = gameRepository.getGamesLimit(limit);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No games found in database");
        }
        return returnList;
    }

    public Game updateGame(UUID gameId, GameDto gameDto) throws SQLException {
        return gameRepository.updateGame(gameId, gameDto).getFirst();
    }

    public Game deleteGame(UUID gameId) throws SQLException {
        return gameRepository.deleteGame(gameId).getFirst();
    }
}
