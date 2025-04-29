import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { CreateStripePriceInputDto } from "src/shared/dtos/stripe/price/create-stripe-price-input.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";
import { CreateStripeProductInputDto } from "src/shared/dtos/stripe/product/create-stripe-product-input.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";
import { PriceMapper } from "src/shared/mappers/price.mapper";
import Stripe from "stripe";

@Injectable()
export class StripeService implements PaymentService {
    private stripe: Stripe | null;
    constructor() { this.__getStripe() }

    private __getStripe() {
        if (!this.stripe) {
            this.stripe = new Stripe(process.env.SK_KEY!)
        }
    }

    /** FIND **/

    async findPriceById(id: string): Promise<StripePriceOutputDto|undefined> {
        const price = await this.stripe?.prices.retrieve(id);

        if (!price) return undefined;
        return PriceMapper.mapPriceResponseToPriceOutput(price);
    }

    /** CREATE **/

    async createProduct(createData: CreateProductInputDto): Promise<StripeProductOutputDto|undefined> {
        const createStripeData: CreateStripeProductInputDto = this.__mapProductDtoToStripeProduct(createData);

        return await this.stripe?.products.create({
            ...createStripeData
        });
    }

    async createPrice(createData: CreatePriceInputDto): Promise<StripePriceOutputDto|undefined> {
        const createStripeData: CreateStripePriceInputDto = this.__mapPriceDtoToStripePrice(createData);

        const price = await this.stripe?.prices.create({
            ...createStripeData
        });

        if (!price) return undefined;
        return PriceMapper.mapPriceResponseToPriceOutput(price);
    }

    /** CHECKOUT **/

    async checkout(checkoutData: ExtendedCheckoutSessionInputDto): Promise<any> {
        return this.stripe?.checkout.sessions.create({
            ...checkoutData,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
    }

    /** MAPPING **/

    private __mapProductDtoToStripeProduct(dto: CreateProductInputDto): CreateStripeProductInputDto {
        const stripeDto: CreateStripeProductInputDto = {
            name: dto.name
        }
        return stripeDto;
    }

    private __mapPriceDtoToStripePrice(dto: CreatePriceInputDto): CreateStripePriceInputDto {
        const stripeDto: CreateStripePriceInputDto = {
            currency: dto.currency as string,
            product: dto.externalProductId,
            unit_amount: dto.amount,
        }
        return stripeDto;
    }



   
}