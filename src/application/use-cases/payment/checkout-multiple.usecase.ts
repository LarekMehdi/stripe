import { NotFoundException } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { MultipleSmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/multiple-small-checkout-input.dto";
import { LineItemInputDto } from "src/shared/dtos/stripe/line-item/line-item-input.dto";

export class PaymentCheckoutMultipleUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(checkoutDatas: MultipleSmallCheckoutInputDto) {
        const productIds: number[] = checkoutDatas.products.map(p => p.id);
        const products: Product[] = await this.productRepository.findByIds(productIds);

        if (products.length === 0) throw new NotFoundException(`No product found for ids ${productIds}`);

        // check for productWithoutStock

        const datas: ExtendedCheckoutSessionInputDto = this.__getExtendedInput(products, checkoutDatas);
        const checkoutResponse = await this.paymentService.checkout(datas);
        console.log('response => ', checkoutResponse);

        const updatedProducts: Product[] = this.__getNewQuantity(products, checkoutDatas);
        return await this.productRepository.updateMany(updatedProducts);
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
        }

        return extendedInput;
    }

    private __getNewQuantity(products: Product[], datas: MultipleSmallCheckoutInputDto): Product[] {
        for (const product of products) {
            const data = datas.products.find(p => p.id === product.id);
            product.quantity = product.quantity - data!.quantity;
        }
        return products;
    }
}