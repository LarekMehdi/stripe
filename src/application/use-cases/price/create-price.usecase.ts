import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Price } from "src/domain/entities/price/price.entity";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";

@Injectable()
export class CreatePriceUseCase {
    constructor(private readonly priceRepository: PriceRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(data: CreatePriceInputDto): Promise<Price> {
        const price: StripePriceOutputDto | undefined = await this.paymentService.createPrice(data);
        if (!price) throw new ServiceUnavailableException(`Something went wrong with Stripe API`);

        data.externalPriceId = price.id;
        return await this.priceRepository.create(data);
    }
}