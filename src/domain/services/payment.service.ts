import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { StripeCustomerOutputDto } from "src/shared/dtos/stripe/customer/stripe-customer-output.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";
import Stripe from "stripe";

export abstract class PaymentService {
    
    abstract createProduct(createData: CreateProductInputDto): Promise<StripeProductOutputDto|undefined>
    abstract createPrice(createData: CreatePriceInputDto): Promise<StripePriceOutputDto|undefined>
    abstract checkout(data: ExtendedCheckoutSessionInputDto): Promise<any>

    abstract findPriceById(id: string): Promise<StripePriceOutputDto|undefined>
    
    abstract findCustomerByExternalId(externalId: string): Promise<any>
    abstract createCustomer(createData: CreateCustomerInputDto): Promise<StripeCustomerOutputDto|undefined>

    abstract findSubcriptionByExternalId(externalId: string): Promise<Stripe.Subscription|undefined>
    abstract cancelSubscription(externalId: string): Promise<Stripe.Subscription|undefined>
}