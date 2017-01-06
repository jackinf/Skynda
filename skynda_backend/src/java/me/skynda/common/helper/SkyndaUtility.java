package me.skynda.common.helper;

import org.apache.commons.codec.binary.Base64;

import java.util.Optional;
import java.util.function.Supplier;

public class SkyndaUtility {

    /**
     * Instead of using if param != null && param.nested != null && param.nested.foo != null
     * you can propagate nulls using resolve(() -> obj.getParam1().getInner().getFoo());
     *
     * @param resolver - агтсешщт
     * @param <T> - returned type
     * @return Last method's result in chain or null if some method returns null.
     */
    public static <T> Optional<T> resolve(Supplier<T> resolver) {
        try {
            T result = resolver.get();
            return Optional.ofNullable(result);
        }
        catch (NullPointerException e) {
            return null;
        }
    }

    public static byte[] toBytearray(String base64File) {
        // Cut out the part describing the type of the file
        String second = base64File.split(",")[1];

        // Convert base64 to bytes
        return Base64.decodeBase64(second.getBytes());
    }
}
