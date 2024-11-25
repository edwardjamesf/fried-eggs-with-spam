package org.fews.backend.repository;

import org.fews.backend.model.Purchase;
import org.fews.backend.model.PurchaseDto;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class PurchaseRepository {
    private final JdbcTemplate template;

    public PurchaseRepository(JdbcTemplate template) {
        this.template = template;
    }

    public static class PurchaseExtractor implements ResultSetExtractor<List<Purchase>> {
        @Override
        public List<Purchase> extractData(ResultSet resultSet) throws SQLException, DataAccessException {
            List<Purchase> purchases = new ArrayList<>();
            while (resultSet.next()) {
                Purchase purchase = Purchase.builder()
                        .id((UUID) resultSet.getObject("id"))
                        .name(resultSet.getString("name"))
                        .purchaseDate(resultSet.getString("purchase_date"))
                        .costBase(resultSet.getDouble("cost_base"))
                        .costTax(resultSet.getDouble("cost_tax"))
                        .costShipping(resultSet.getDouble("cost_shipping"))
                        .costOther(resultSet.getDouble("cost_other"))
                        .costTotal(resultSet.getDouble("cost_total"))
                        .purchaseFrom(resultSet.getString("purchase_from"))
                        .notes(resultSet.getString("notes"))
                        .imageId((UUID) resultSet.getObject("image_id"))
                        .consoleId((UUID) resultSet.getObject("console_id"))
                        .gameId((UUID) resultSet.getObject("game_id"))
                        .createdTimestamp(((Timestamp) resultSet.getObject("created_timestamp")).toInstant())
                        .modifiedTimestamp(((Timestamp) resultSet.getObject("modified_timestamp")).toInstant())
                        .build();

                purchases.add(purchase);
            }
            return purchases;
        }
    }

    public List<Purchase> createPurchase(PurchaseDto purchaseDto) throws SQLException {
        try {
            String sql = "select * from insert_purchase(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new PurchaseExtractor(),
                    purchaseDto.getName(),
                    purchaseDto.getPurchaseDate(),
                    purchaseDto.getCostBase(),
                    purchaseDto.getCostTax(),
                    purchaseDto.getCostShipping(),
                    purchaseDto.getCostOther(),
                    purchaseDto.getPurchaseFrom(),
                    purchaseDto.getNotes(),
                    purchaseDto.getImageId(),
                    purchaseDto.getConsoleId(),
                    purchaseDto.getGameId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Create purchase query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not create purchase record: " + e.getMessage());
        }
    }

    public List<Purchase> getPurchase(UUID purchaseId) throws SQLException {
        try {
            String sql = "select * from fetch_purchase(?)";
            return template.query(
                    sql,
                    new PurchaseExtractor(),
                    purchaseId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch purchase query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch purchase record: " + e.getMessage());
        }
    }

    public List<Purchase> getPurchasesAll() throws SQLException {
        try {
            String sql = "select * from fetch_purchase_all()";
            return template.query(
                    sql,
                    new PurchaseExtractor()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch all purchases query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch all purchase records: " + e.getMessage());
        }
    }

    public List<Purchase> getPurchasesLimit(int limit) throws SQLException {
        try {
            String sql = "select * from fetch_purchase_limit(?)";
            return template.query(
                    sql,
                    new PurchaseExtractor(),
                    limit
            );
        }catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Fetch purchases query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not fetch purchase records: " + e.getMessage());
        }
    }

    public List<Purchase> updatePurchase(UUID purchaseId, PurchaseDto purchaseDto) throws SQLException {
        try {
            String sql = "select * from update_purchase(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            return template.query(
                    sql,
                    new PurchaseExtractor(),
                    purchaseId,
                    purchaseDto.getName(),
                    purchaseDto.getPurchaseDate(),
                    purchaseDto.getCostBase(),
                    purchaseDto.getCostTax(),
                    purchaseDto.getCostShipping(),
                    purchaseDto.getCostOther(),
                    purchaseDto.getPurchaseFrom(),
                    purchaseDto.getNotes(),
                    purchaseDto.getImageId(),
                    purchaseDto.getConsoleId(),
                    purchaseDto.getGameId()
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Update purchase query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not update purchase record: " + e.getMessage());
        }
    }

    public List<Purchase> deletePurchase(UUID purchaseId) throws SQLException {
        try {
            String sql = "select * from delete_purchase(?)";
            return template.query(
                    sql,
                    new PurchaseExtractor(),
                    purchaseId
            );
        } catch (DataAccessException e) {
            throw new SQLException("Internal Database Error: Delete purchase query failed to execute: " + e.getMessage());
        } catch (Exception e) {
            throw new SQLException("Internal Database Error: Could not delete purchase record: " + e.getMessage());
        }
    }
}
