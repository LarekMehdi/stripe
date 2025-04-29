import { Price } from "src/domain/entities/price/price.entity";
import { PriceRepository } from "src/domain/repositories/price.repository";

export class PriceFindByIdUseCase {
    constructor(private readonly priceRepository: PriceRepository) {}

    async execute(id: number): Promise<Price|null> {
        return await this.priceRepository.findById(id);
    }
}