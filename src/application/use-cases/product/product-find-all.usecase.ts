import { Injectable } from "@nestjs/common";
import { Price } from "src/domain/entities/price/price.entity";
import { Product } from "src/domain/entities/product/product.entity";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { ProductOutputDto } from "src/shared/dtos/product/product-output.dto";

@Injectable()
export class ProductFindAllUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly priceRepository: PriceRepository,
    ) {}

    async execute(): Promise<ProductOutputDto[]> {
        const products: Product[] = await this.productRepository.findAll();
        const productIds: number[] = products.map((p) => p.id);
        const prices: Price[] = await this.priceRepository.findAllByIds(productIds);

        return this.__mapProductsToProductOutputs(products, prices);
    }

    private __mapProductsToProductOutputs(products: Product[], prices: Price[]): ProductOutputDto[]{
        const dtos: ProductOutputDto[] = [];

        for (const product of products) {
            const productPrice: Price|undefined = prices.find((p) => p.productId === product.id);

            const dto: ProductOutputDto = {
                id: product.id,
                name: product.name,
                quantity: product.quantity,
                externalPriceId: product.externalPriceId,
                externalProductId: product.externalProductId,
                price: productPrice!.amount,
                type: productPrice!.type,
                interval: productPrice!.interval,
                intervalCount: productPrice!.intervalCount
            }
            dtos.push(dto);
        }
        return dtos;
    }
}