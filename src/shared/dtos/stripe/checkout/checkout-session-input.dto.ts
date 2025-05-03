import { CheckoutSessionMode } from "src/shared/constantes/checkoutSessionMode.enum";
import { LineItemInputDto } from "../line-item/line-item-input.dto";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class InvoiceCreation {

    @IsBoolean()
    @IsNotEmpty()
    enabled: boolean;
}

export class CheckoutSessionInputDto {

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LineItemInputDto)
    line_items: LineItemInputDto[];

    @IsEnum(CheckoutSessionMode)
    @IsNotEmpty()
    mode: CheckoutSessionMode;

    @IsEmail()
    @IsOptional()
    customer_email?: string;

    @IsString()
    @IsOptional()
    customer?: string; // customer_id

    @IsBoolean()
    @IsOptional()
    invoice?: boolean;
}

export class ExtendedCheckoutSessionInputDto extends CheckoutSessionInputDto {

    @IsOptional()
    invoice_creation?: InvoiceCreation;

    @IsOptional()
    optional_items?: LineItemInputDto[];

    @IsOptional()
    @IsString()
    client_reference_id?: string;

    @IsOptional()
    metadata?: Record<string, string>
}


