package org.fews.backend.utility;

import org.fews.backend.model.Purchase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Utilities {
    private Utilities() {}

    private static final Logger logger = LoggerFactory.getLogger(Utilities.class);
    private static final DateTimeFormatter dateTimeFormatterDb = DateTimeFormatter.ofPattern("MM/dd/yyyy");
    private static final DateTimeFormatter dateTimeFormatterOut = DateTimeFormatter.ofPattern("yyyy/MM/dd");

    public static void formatDates(List<Purchase> purchases) {
        try {
            for (Purchase purchase : purchases) {
                String dateString = purchase.getPurchaseDate();
                LocalDate localDate = LocalDate.parse(dateString, dateTimeFormatterDb);
                purchase.setPurchaseDate(localDate.format(dateTimeFormatterOut));
            }
        } catch (Exception e) {
            logger.warn(e.getLocalizedMessage());
        }
    }
}
