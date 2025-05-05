import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerInputDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    externalId: string | null;
}