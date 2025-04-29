import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { CreateProductUseCase } from "src/application/use-cases/product/create-product.usecase";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ProductOutputDto } from "src/shared/dtos/product/product-output.dto";

@Controller('product')
export class ProductController {
    constructor(private readonly createProductUC: CreateProductUseCase) {}

    @Post('create')
    async create(@Body() data: CreateProductInputDto): Promise<ProductOutputDto> {
        return this.createProductUC.execute(data);
    }
}