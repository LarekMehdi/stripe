import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { CheckoutProductOutputDto } from "src/shared/dtos/stripe/checkout/checkout-product-output.dto";

@Injectable()
export class PaymentCheckoutResponseUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    async execute(response: any):  Promise<Product[]|null> {
        switch (response.type) {
            case 'checkout.session.completed':
                const cart: CheckoutProductOutputDto[] = JSON.parse(response.data.object.metadata.cart);
                console.log('updated => ', cart);

                const products: Partial<Product>[] = this.__mapDtoToProducts(cart);
                return await this.productRepository.updateMany(products);
            break;

            case 'payment_intent.payment_failed':
                // envoyer un mail?
            break;

            case 'checkout.session.expired':
                // vider un panier, libérer des produits reservés, ect...
            break;

            default:
                return null;
        }
        return null;
    }

    private __mapDtoToProducts(dtos: CheckoutProductOutputDto[]): Partial<Product>[] {
        const products: Partial<Product>[] = [];
        for (const dto of dtos) {
            const product: Partial<Product> = {
                id: dto.id,
                quantity: dto.newQuantity
            }
            products.push(product);
        }
        return products;

    }
}