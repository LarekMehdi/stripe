import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { CreateProductWithPriceInputDto } from "src/shared/dtos/product/create-product-with-price-input.dto";
import { ProductOutputDto } from "src/shared/dtos/product/product-output.dto";

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly priceRepository: PriceRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(data: CreateProductWithPriceInputDto): Promise<ProductOutputDto> {
        // création du Product dans Stripe
        const product = await this.paymentService.createProduct(data);
        if (!product || !product.id) throw new ServiceUnavailableException(`Something went wrong with Stripe API [create product]`);

        // récupération de l'id du Product de Stripe
        data.externalProductId = product.id;

        // création du Product en base
        const productData: CreateProductInputDto = this.__mapExtendedInputToProductInput(data);
        const createdProduct = await this.productRepository.create(productData);

        // création du Price dans Stripe
        const priceData: CreatePriceInputDto = this.__mapExtendedInputToPriceInput(data, createdProduct.id);
        const price = await this.paymentService.createPrice(priceData);
        if (!price || !price.id) throw new ServiceUnavailableException(`Something went wrong with Stripe API [create price]`);

        // récupération de l'id du Price de Stripe
        productData.externalPriceId = price.id;
        priceData.externalPriceId = price.id;

        // création du Price en base
        priceData.amount = (priceData.amount / 100);
        await this.priceRepository.create(priceData);

        // maj du Product en base avec le priceId
        return await this.productRepository.update(productData, createdProduct.id);
  
    }

    /** MAPPING **/

    private __mapExtendedInputToPriceInput(data: CreateProductWithPriceInputDto, productId: number): CreatePriceInputDto {
        const priceInput: CreatePriceInputDto = {
            amount: data.amount * 100,
            currency: data.currency,
            productId: productId,
            externalProductId: data.externalProductId!,
            externalPriceId: null
        }
        return priceInput;
    }

    private __mapExtendedInputToProductInput(data: CreateProductWithPriceInputDto): CreateProductInputDto {
        const productInput: CreateProductInputDto = {
            name: data.name,
            quantity: data.quantity,
            externalPriceId: data.externalPriceId,
            externalProductId: data.externalProductId
        }
        return productInput;
    }
}