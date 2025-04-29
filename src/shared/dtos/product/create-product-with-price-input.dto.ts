import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateProductInputDto } from "./create-product-input.dto";
import { Type } from "class-transformer";
import { Currency } from "src/shared/constantes/currency.enum";

export class CreateProductWithPriceInputDto extends CreateProductInputDto{
    
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsNotEmpty()
    currency: Currency;
}