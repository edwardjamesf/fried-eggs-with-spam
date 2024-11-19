package org.fews.backend.repository;

import org.fews.backend.model.Console;
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
public class ConsoleRepository {
    private final JdbcTemplate template;

    public ConsoleRepository(JdbcTemplate template) {
        this.template = template;
    }

    public static class ConsoleExtractor implements ResultSetExtractor<List<Console>> {
        @Override
        public List<Console> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
            List<Console> consoles = new ArrayList<>();
            while (resultSet.next()) {
                Console console = new Console();
                console.setId((UUID) resultSet.getObject("id"));
                console.setName(resultSet.getString("name"));
                console.setManufacturer(resultSet.getString("manufacturer"));
                console.setReleaseDate(resultSet.getString("release_date"));
                console.setDescription(resultSet.getString("description"));
                console.setImageId(resultSet.getString("image_id"));

                consoles.add(console);
            }
            return consoles;
        }
    }

    public List<Console> createConsole(Console console) throws SQLException {
        try {
            String sql = "select * from insert_console(?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new ConsoleExtractor(),
                    console.getName(),
                    console.getManufacturer(),
                    console.getReleaseDate(),
                    console.getDescription(),
                    console.getImageId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Create console query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not create console record: " + e.getMessage());
        }
    }

    public List<Console> getConsole(UUID consoleId) throws SQLException {
        try {
            String sql = "select * from fetch_console(?)";
            return template.query(
                    sql,
                    new ConsoleExtractor(),
                    consoleId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch console query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch console record: " + e.getMessage());
        }
    }

    public List<Console> updateConsole(UUID consoleId, Console console) throws SQLException {
        try {
            String sql = "select * from update_console(?, ?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new ConsoleExtractor(),
                    consoleId,
                    console.getName(),
                    console.getManufacturer(),
                    console.getReleaseDate(),
                    console.getDescription(),
                    console.getImageId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Update console query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not update console record: " + e.getMessage());
        }
    }

    public List<Console> deleteConsole(UUID consoleId) throws SQLException {
        try {
            String sql = "select * from delete_console(?)";
            return template.query(
                    sql,
                    new ConsoleExtractor(),
                    consoleId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Delete console query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not delete console record: " + e.getMessage());
        }
    }
}