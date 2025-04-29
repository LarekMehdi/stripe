import { Injectable, NotFoundException, PreconditionFailedException } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";

@Injectable()
export class PaymentCheckoutUseCase {
    constructor(private readonly paymentService: PaymentService,
                private readonly productRepository: ProductRepository
    ) {}
    
    public async execute(checkoutData: ExtendedCheckoutSessionInputDto, productId: number) {
        const product: Product | null = await this.productRepository.findById(productId);

        if (!product) throw new NotFoundException(`No product found for id ${productId}`);
        if (product.quantity <= 0) throw new PreconditionFailedException(`Product ${product.name} is out of order`);
        if (!product.externalPriceId) throw new PreconditionFailedException(`No priceId found for product id ${productId}`);

        return await this.paymentService.checkout(checkoutData);

        // décrémenter la quantité
    }
}