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

    public Game updateGame(UUID gameId, GameDto gameDto) throws SQLException {
        return gameRepository.updateGame(gameId, gameDto).getFirst();
    }

    public Game deleteGame(UUID gameId) throws SQLException {
        return gameRepository.deleteGame(gameId).getFirst();
    }
}
