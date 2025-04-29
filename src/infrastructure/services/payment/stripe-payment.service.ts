import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
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

    async checkout(checkoutData: ExtendedCheckoutSessionInputDto): Promise<any> {
        return this.stripe?.checkout.sessions.create({
            ...checkoutData,
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });
    }

   
}