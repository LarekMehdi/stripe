import Stripe from "stripe";
import { StripeCustomerOutputDto } from "../dtos/stripe/customer/stripe-customer-output.dto";

export abstract class CustomerMapper {

    static mapCustomerResponseToCustomerOutput(data: Stripe.Response<Stripe.Customer>): StripeCustomerOutputDto {
        const customer: StripeCustomerOutputDto = {
            id: data.id,
            email: data.email,
            metadata: data.metadata,
            balance: data.balance
        }
        return customer;
    }
}