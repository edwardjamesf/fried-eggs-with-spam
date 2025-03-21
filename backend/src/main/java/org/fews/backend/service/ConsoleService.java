package org.fews.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.fews.backend.model.Console;
import org.fews.backend.model.ConsoleDto;
import org.fews.backend.repository.ConsoleRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class ConsoleService {
    private final ConsoleRepository consoleRepository;

    public ConsoleService(ConsoleRepository consoleRepository) {
        this.consoleRepository = consoleRepository;
    }

    public Console createConsole(ConsoleDto consoleDto) throws SQLException {
        return consoleRepository.createConsole(consoleDto).getFirst();
    }

    public Console getConsole(UUID consoleId) throws SQLException {
        List<Console> returnList = consoleRepository.getConsole(consoleId);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("Console ID " + consoleId + " not found");
        }
        returnList.sort(Comparator.comparing(Console::getFullName));
        return returnList.getFirst();
    }

    public List<Console> getConsolesAll() throws SQLException {
        List<Console> returnList = consoleRepository.getConsolesAll();
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("No consoles found in database");
        }
        returnList.sort(Comparator.comparing(Console::getFullName));
        return returnList;
    }

    public Console updateConsole(UUID consoleId, ConsoleDto consoleDto) throws SQLException {
        return consoleRepository.updateConsole(consoleId, consoleDto).getFirst();
    }

    public Console deleteConsole(UUID consoleId) throws SQLException {
        return consoleRepository.deleteConsole(consoleId).getFirst();
    }
}
