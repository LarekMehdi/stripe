import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductInputDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    quantity: number;

    @IsOptional()
    @IsString()
    priceId: string | null;
}