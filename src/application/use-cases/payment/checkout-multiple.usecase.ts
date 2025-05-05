import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CheckoutProductOutputDto } from "src/shared/dtos/stripe/checkout/checkout-product-output.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { MultipleSmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/multiple-small-checkout-input.dto";
import { LineItemInputDto } from "src/shared/dtos/stripe/line-item/line-item-input.dto";
import { SmallProductInputDto } from "src/shared/dtos/stripe/product/small-product-input.dto";

@Injectable()
export class PaymentCheckoutMultipleUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(checkoutDatas: MultipleSmallCheckoutInputDto) {
        const productIds: number[] = checkoutDatas.products.map(p => p.id);
        const products: Product[] = await this.productRepository.findAllByIds(productIds);

        if (products.length === 0) throw new NotFoundException(`No product found for ids ${productIds}`);

        // check for productWithoutStock

        const datas: ExtendedCheckoutSessionInputDto = this.__getExtendedInput(products, checkoutDatas);
        const checkoutResponse = await this.paymentService.checkout(datas);
        
        //console.log('response => ', checkoutResponse);
        console.log(products);

        return checkoutResponse;
    }

    // TODO: à refactoriser
    private __getExtendedInput(products: Product[], checkoutDatas: MultipleSmallCheckoutInputDto): ExtendedCheckoutSessionInputDto {
        const lineItems: LineItemInputDto[] = [];

        for (const product of products) {
            const data = checkoutDatas.products.find(p => p.id === product.id);
            const lineItem: LineItemInputDto = {
                price: product.externalPriceId!,
                quantity: data!.quantity
            }
            lineItems.push(lineItem);
        }
       
        const extendedInput: ExtendedCheckoutSessionInputDto = {
            line_items: lineItems,
            mode: checkoutDatas.mode,
            customer_email: checkoutDatas.customer_email,
            metadata: this.__getCartMetadata(products, checkoutDatas),
        }

        return extendedInput;
    }

    private __getCartMetadata(products: SmallProductInputDto[], datas: MultipleSmallCheckoutInputDto): Record<string, string> {
        const cart: CheckoutProductOutputDto[] = [];
    
        // pour achat en meme temps? Décrémenter plutot que de sauvegarder la quantité finale
        for (const product of products) {
            const data = datas.products.find(p => p.id === product.id);
            const cartProduct: CheckoutProductOutputDto = {
                id: product.id,
                newQuantity: product.quantity - data!.quantity
            }
            cart.push(cartProduct);
        }

        return {cart: JSON.stringify(cart)}
    }
}