package org.fews.backend.service;

import org.fews.backend.model.Console;
import org.fews.backend.repository.ConsoleRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.UUID;

@Service
public class ConsoleService {
    private final ConsoleRepository consoleRepository;

    public ConsoleService(ConsoleRepository consoleRepository) {
        this.consoleRepository = consoleRepository;
    }

    public Console createConsole(Console console) throws SQLException {
        return consoleRepository.createConsole(console).getFirst();
    }

    public Console getConsole(UUID consoleId) throws SQLException {
        return consoleRepository.getConsole(consoleId).getFirst();
    }

    public Console updateConsole(UUID consoleId, Console console) throws SQLException {
        return consoleRepository.updateConsole(consoleId, console).getFirst();
    }

    public Console deleteConsole(UUID consoleId) throws SQLException {
        return consoleRepository.deleteConsole(consoleId).getFirst();
    }
}
