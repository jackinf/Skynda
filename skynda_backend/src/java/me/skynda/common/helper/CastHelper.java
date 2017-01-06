package me.skynda.common.helper;

import me.skynda.classification.dto.SliderAttributesDto;
import org.apache.commons.lang3.NotImplementedException;

import java.math.BigDecimal;

/**
 * Created by ardi-pc on 2016-11-26.
 */
public class CastHelper {
    public static BigDecimal[] AttributesToBigDecimal(SliderAttributesDto attributes){
        BigDecimal[] values;
        Double min = attributes.getMin();
        Double max = attributes.getMax();

        try{
            BigDecimal minDecimal = new BigDecimal(min);
            BigDecimal maxDecimal = new BigDecimal(max);
            values = new BigDecimal[]{minDecimal, maxDecimal};
        }catch (Exception ex){
            throw new NotImplementedException("not implemented", ex.getMessage());
        }

        return values;
    }
}
