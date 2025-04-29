import Stripe from "stripe";
import { StripePriceOutputDto } from "../dtos/stripe/price/stripe-price-output.dto";

export abstract class PriceMapper {

    static mapPriceResponseToPriceOutput(data: Stripe.Response<Stripe.Price>): StripePriceOutputDto {
        const price: StripePriceOutputDto = {
            id: data.id,
            currency: data.currency,
            product: typeof data.product === 'string' ? data.product : data.product.id,
            unit_amount: data.unit_amount ?? 0,
            type: data.type,
            billing_scheme: data.billing_scheme
        }
        return price;
    }
}