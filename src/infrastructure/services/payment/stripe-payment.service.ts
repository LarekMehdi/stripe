import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { CreateStripeProductInputDto } from "src/shared/dtos/stripe/product/create-stripe-product-input.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";
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

    /** CREATE **/

    async createProduct(createData: CreateProductInputDto): Promise<StripeProductOutputDto|undefined> {
        const createStripeData: CreateStripeProductInputDto = this.__mapProductDtoToStripeProduct(createData);

        return await this.stripe?.products.create({
            ...createStripeData
        })

    }

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



   
}