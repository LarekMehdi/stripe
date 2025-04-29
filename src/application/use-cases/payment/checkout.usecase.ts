import { Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CheckoutSessionMode } from "src/shared/constantes/checkoutSessionMode.enum";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { SmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/small-checkout-input.dto";
import { LineItemInputDto } from "src/shared/dtos/stripe/line-item/line-item-input.dto";

@Injectable()
export class PaymentCheckoutUseCase {
    constructor(private readonly paymentService: PaymentService,
                private readonly productRepository: ProductRepository
    ) {}
    
    // TODO: remplacer productId par productIds
    public async execute(data: SmallCheckoutInputDto, productId: number) {
        const product: Product | null = await this.productRepository.findById(productId);

        if (!product) throw new NotFoundException(`No product found for id ${productId}`);
        if (product.quantity - data.quantity <= 0) throw new PreconditionFailedException(`Not enought stock for ${product.name}, [stock: ${product.quantity}, requested: ${data.quantity}]`);
        if (!product.externalPriceId) throw new PreconditionFailedException(`No priceId found for product id ${productId}`);

        const checkoutData: ExtendedCheckoutSessionInputDto = this.__getExtendedInput(product, data);
        const checkoutResponse = await this.paymentService.checkout(checkoutData);
        console.log('response => ', checkoutResponse);
        product.quantity = product.quantity - data.quantity;
    
        return await this.productRepository.update(product, productId);
    }

    // TODO: gérer optionnalItemIds
    private __getExtendedInput(product: Product, data: SmallCheckoutInputDto): ExtendedCheckoutSessionInputDto {
        const lineItems: LineItemInputDto[] = [];
        const lineItem: LineItemInputDto = {
            price: product.externalPriceId!,
            quantity: data.quantity
        }
        lineItems.push(lineItem);

        const extendedInput: ExtendedCheckoutSessionInputDto = {
            line_items: lineItems,
            mode: data.mode,
            customer_email: data.customer_email,
        }

        return extendedInput;
    }
}