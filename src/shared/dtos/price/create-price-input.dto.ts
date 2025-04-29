import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Currency } from "src/shared/constantes/currency.enum";

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
}