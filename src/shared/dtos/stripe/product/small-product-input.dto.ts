import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SmallProductInputDto {

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    quantity: number;
}