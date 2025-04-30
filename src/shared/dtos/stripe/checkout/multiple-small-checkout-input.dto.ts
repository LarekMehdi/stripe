import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CheckoutSessionMode } from "src/shared/constantes/checkoutSessionMode.enum";
import { SmallProductInputDto } from "../product/small-product-input.dto";

export class MultipleSmallCheckoutInputDto {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SmallProductInputDto)
    products: SmallProductInputDto[]

    @IsEnum(CheckoutSessionMode)
    @IsNotEmpty()
    mode: CheckoutSessionMode;
    
    @IsEmail()
    @IsOptional()
    customer_email?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Number)
    optionnalItemIds?: number[];

}