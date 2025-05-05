import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { CreateProductInputDto } from "./create-product-input.dto";
import { Type } from "class-transformer";
import { Currency } from "src/shared/constantes/currency.enum";
import { PriceType, RecurringInterval } from "src/shared/constantes/subscription.enum";

export class CreateProductWithPriceInputDto extends CreateProductInputDto{
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsNotEmpty()
    currency: Currency;

    @IsOptional()
    @IsEnum(PriceType)
    type?: PriceType;

    @IsOptional()
    @IsEnum(RecurringInterval)
    interval?: RecurringInterval;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    intervalCount?: number;
}