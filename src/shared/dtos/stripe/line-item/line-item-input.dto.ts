import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LineItemInputDto {

    @IsString()
    @IsNotEmpty()
    price: string; // price_id

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    quantity: number;
}