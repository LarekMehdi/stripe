import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ProductOutputDto } from "src/shared/dtos/product/product-output.dto";

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(data: CreateProductInputDto): Promise<ProductOutputDto> {

        const product = await this.paymentService.createProduct(data);
        if (!product || !product.id) throw new ServiceUnavailableException(`Something went wrong with Stripe API`);

        data.externalProductId = product.id;
        return await this.productRepository.create(data);
    }
}