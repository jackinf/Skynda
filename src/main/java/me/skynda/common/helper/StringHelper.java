package me.skynda.common.helper;

import me.skynda.classification.dto.SliderAttributesDto;

public class StringHelper {

    /**
     * Checks if string is null or whitespace
     * @param s - checked string
     * @return success
     */
    public static boolean empty(final String s) {
        return s == null || s.trim().isEmpty();
    }
}
