import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
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
    externalProductId: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    externalPriceId: string | null;
}