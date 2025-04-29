import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CheckoutSessionMode } from "src/shared/constantes/checkoutSessionMode.enum";

export class SmallCheckoutInputDto {
  
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

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    quantity: number;
}