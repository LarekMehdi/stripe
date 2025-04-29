import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreatePriceUseCase } from "src/application/use-cases/price/create-price.usecase";
import { PriceFindByIdUseCase } from "src/application/use-cases/price/price-find-by-id.usecase";
import { Price } from "src/domain/entities/price/price.entity";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";

@Controller('price')
export class PriceController {
    constructor(private readonly priceFindByIdUC: PriceFindByIdUseCase,
                private readonly priceCreateUC: CreatePriceUseCase
    ) {}

    /** FIND **/

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<Price|null> {
        return await this.priceFindByIdUC.execute(id);
    }

    /** CREATE **/

    @Post()
    async create(@Body() createData: CreatePriceInputDto): Promise<Price> {
        return await this.priceCreateUC.execute(createData);
    }
}