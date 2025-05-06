import { StripeRecurringInputDto } from "./stripe-recurring-input.dto";

export class CreateStripePriceInputDto {
    currency: string;
    product: string; // product_id
    unit_amount: number; // price * 100
    recurring?: StripeRecurringInputDto;
}