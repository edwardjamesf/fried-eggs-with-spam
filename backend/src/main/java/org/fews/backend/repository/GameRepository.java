package org.fews.backend.repository;

import org.fews.backend.model.Game;
import org.fews.backend.model.GameDto;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class GameRepository {
    private final JdbcTemplate template;

    public GameRepository(JdbcTemplate template) {
        this.template = template;
    }

    public static class GameExtractor implements ResultSetExtractor<List<Game>> {
        @Override
        public List<Game> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
            List<Game> games = new ArrayList<>();
            while (resultSet.next()) {
                Game game = Game.builder()
                        .id((UUID) resultSet.getObject("id"))
                        .name(resultSet.getString("name"))
                        .developer(resultSet.getString("developer"))
                        .publisher(resultSet.getString("publisher"))
                        .releaseDate(resultSet.getString("release_date"))
                        .description(resultSet.getString("description"))
                        .imageId((UUID) resultSet.getObject("image_id"))
                        .consoleId((UUID) resultSet.getObject("console_id"))
                        .build();

                games.add(game);
            }
            return games;
        }
    }

    public List<Game> createGame(GameDto gameDto) throws SQLException {
        try {
            String sql = "select * from insert_game(?, ?, ?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new GameExtractor(),
                    gameDto.getName(),
                    gameDto.getDeveloper(),
                    gameDto.getPublisher(),
                    gameDto.getReleaseDate(),
                    gameDto.getDescription(),
                    gameDto.getImageId(),
                    gameDto.getConsoleId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Create game query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not create game record: " + e.getMessage());
        }
    }

    public List<Game> getGame(UUID gameId) throws SQLException {
        try {
            String sql = "select * from fetch_game(?)";
            return template.query(
                    sql,
                    new GameExtractor(),
                    gameId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch game query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch game record: " + e.getMessage());
        }
    }

    public List<Game> updateGame(UUID gameId, GameDto gameDto) throws SQLException {
        try {
            String sql = "select * from update_game(?, ?, ?, ?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new GameExtractor(),
                    gameId,
                    gameDto.getName(),
                    gameDto.getDeveloper(),
                    gameDto.getPublisher(),
                    gameDto.getReleaseDate(),
                    gameDto.getDescription(),
                    gameDto.getImageId(),
                    gameDto.getConsoleId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Update game query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not update game record: " + e.getMessage());
        }
    }

    public List<Game> deleteGame(UUID gameId) throws SQLException {
        try {
            String sql = "select * from delete_game(?)";
            return template.query(
                    sql,
                    new GameExtractor(),
                    gameId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Delete game query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not delete game record: " + e.getMessage());
        }
    }
}
