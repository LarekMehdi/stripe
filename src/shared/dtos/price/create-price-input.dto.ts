
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Currency } from "src/shared/constantes/currency.enum";
import { PriceType, RecurringInterval } from "src/shared/constantes/subscription.enum";

export class CreatePriceInputDto {

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsNotEmpty()
    currency: Currency;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    productId: number;

    @IsNotEmpty()
    @IsString()
    externalProductId: string;

    @IsOptional()
    @IsString()
    externalPriceId: string | null;

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