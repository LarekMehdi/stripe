import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateProductUseCase } from "src/application/use-cases/product/create-product.usecase";
import { ProductFindAllUseCase } from "src/application/use-cases/product/product-find-all.usecase";
import { CreateProductWithPriceInputDto } from "src/shared/dtos/product/create-product-with-price-input.dto";
import { ProductOutputDto } from "src/shared/dtos/product/product-output.dto";

@Controller('product')
export class ProductController {
    constructor(private readonly createProductUC: CreateProductUseCase,
                private readonly productFindAllUC: ProductFindAllUseCase,
    ) {}

    /** CREATE **/

    @Post('create')
    async create(@Body() data: CreateProductWithPriceInputDto): Promise<ProductOutputDto> {
        return await this.createProductUC.execute(data);
    }

    /** FIND ALL **/

    @Get()
    async findAll(): Promise<ProductOutputDto[]> {
        return await this.productFindAllUC.execute();
    }
}