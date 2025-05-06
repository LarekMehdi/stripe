import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";
import { PriceType } from "src/shared/constantes/subscription.enum";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { StripeCustomerOutputDto } from "src/shared/dtos/stripe/customer/stripe-customer-output.dto";
import { CreateStripePriceInputDto } from "src/shared/dtos/stripe/price/create-stripe-price-input.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";
import { StripeRecurringInputDto } from "src/shared/dtos/stripe/price/stripe-recurring-input.dto";
import { CreateStripeProductInputDto } from "src/shared/dtos/stripe/product/create-stripe-product-input.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";
import { StripeSubscriptionOutputDto } from "src/shared/dtos/stripe/subscription/stripe-subscription-output.dto";
import { CustomerMapper } from "src/shared/mappers/customer.mapper";
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

    async findSubcriptionByExternalId(externalId: string): Promise<Stripe.Subscription|undefined> {
        const stripeSubscription = await this.stripe?.subscriptions.retrieve(externalId);
        console.log('stripeSub => ', stripeSubscription);
        return stripeSubscription;
    }

    async findCustomerByExternalId(externalId: string): Promise<any> {
        return await this.stripe?.customers.retrieve(externalId);
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

    async createCustomer(createData: CreateCustomerInputDto): Promise<StripeCustomerOutputDto|undefined> {
        const createdCustomer: Stripe.Response<Stripe.Customer> | undefined = await this.stripe?.customers.create({
            ...createData
        });

        if (!createdCustomer) return;
        return CustomerMapper.mapCustomerResponseToCustomerOutput(createdCustomer);
        
    }

    /** CHECKOUT **/

    async checkout(checkoutData: ExtendedCheckoutSessionInputDto): Promise<any> {
        return this.stripe?.checkout.sessions.create({
            ...checkoutData,
            success_url: 'http://localhost:5173/checkout/success',
            cancel_url: 'http://localhost:5173/checkout/cancel',
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
        
        if (dto.type === PriceType.RECURRING) {
            return this.__mapPriceForSubscription(dto);
        }
        const stripeDto: CreateStripePriceInputDto = {
            currency: dto.currency as string,
            product: dto.externalProductId,
            unit_amount: dto.amount,
            
        }
        return stripeDto;
    }

    private __mapPriceForSubscription(dto: CreatePriceInputDto): CreateStripePriceInputDto {
        const recurringDto = {
            interval: dto.interval!,
            interval_count: dto.intervalCount!
        }
        const stripeDto: CreateStripePriceInputDto = {
            currency: dto.currency as string,
            product: dto.externalProductId,
            unit_amount: dto.amount,
            recurring: recurringDto
        }
        return stripeDto;
    }



   
}