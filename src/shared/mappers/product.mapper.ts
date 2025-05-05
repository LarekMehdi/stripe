import { Price } from "src/domain/entities/price/price.entity";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductOutputDto } from "../dtos/product/product-output.dto";

export abstract class ProductMapper {

    static mapProductToProductOutput(product: Product, price: Price): ProductOutputDto {
        const dto: ProductOutputDto = {
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            externalPriceId: product.externalPriceId,
            externalProductId: product.externalProductId,
            type: price.type,
            price: price.amount,
            interval: price.interval,
            intervalCount: price.intervalCount
        }
        return dto;
    }
}