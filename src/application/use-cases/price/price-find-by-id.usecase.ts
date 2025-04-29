import { Injectable, NotFoundException } from "@nestjs/common";
import { Price } from "src/domain/entities/price/price.entity";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { PriceOutputDto } from "src/shared/dtos/price/price-output.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";

@Injectable()
export class PriceFindByIdUseCase {
    constructor(private readonly priceRepository: PriceRepository,
                private readonly paymentService: PaymentService
    ) {}

    async execute(id: number): Promise<PriceOutputDto|null> {
        const price: Price|null = await this.priceRepository.findById(id);
        if (!price || !price.externalPriceId) throw new NotFoundException(`No price found for id ${id}`);

        const externalPrice = await this.paymentService.findPriceById(price?.externalPriceId);
        if (!externalPrice) throw new NotFoundException(`No external price found for id ${price.externalPriceId}`);

        return this.__mapPricesToOutput(price, externalPrice);
    }

    private __mapPricesToOutput(domainPrice: Price, externalPrice: StripePriceOutputDto): PriceOutputDto {
        const outputPrice: PriceOutputDto = {
            id: domainPrice.id,
            externalId: externalPrice.id,
            amount: domainPrice.amount,
            externalAmount: externalPrice.unit_amount
        }
        return outputPrice;
    }
}