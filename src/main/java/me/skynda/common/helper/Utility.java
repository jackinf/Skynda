package me.skynda.common.helper;

import java.util.Optional;
import java.util.function.Supplier;

public class Utility {

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
            return Optional.empty();
        }
    }
}
