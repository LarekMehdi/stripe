import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { Price } from "../entities/price/price.entity";

export abstract class PriceRepository {
    abstract findById(id: number): Promise<Price|null>
    abstract findByExternalId(externalId: string): Promise<Price|null>
    abstract findAllByIds(ids: number[]): Promise<Price[]>
    abstract create(data: CreatePriceInputDto): Promise<Price>
}