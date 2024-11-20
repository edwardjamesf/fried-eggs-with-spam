package org.fews.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.fews.backend.model.Purchase;
import org.fews.backend.model.PurchaseDto;
import org.fews.backend.repository.PurchaseRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public Purchase createPurchase(PurchaseDto purchaseDto) throws SQLException {
        return purchaseRepository.createPurchase(purchaseDto).getFirst();
    }

    public Purchase getPurchase(UUID purchaseId) throws SQLException {
        List<Purchase> returnList = purchaseRepository.getPurchase(purchaseId);
        if (returnList.isEmpty()) {
            throw new EntityNotFoundException("Purchase ID " + purchaseId + " not found");
        }
        return returnList.getFirst();
    }

    public Purchase updatePurchase(UUID purchaseId, PurchaseDto purchaseDto) throws SQLException {
        return purchaseRepository.updatePurchase(purchaseId, purchaseDto).getFirst();
    }

    public Purchase deletePurchase(UUID purchaseId) throws SQLException {
        return purchaseRepository.deletePurchase(purchaseId).getFirst();
    }
}
