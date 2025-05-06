export class StripeSubscriptionOutputDto {
    id: string; 
    status: string;
    start_date: Date;
    cancel_at: Date | null;
    cancel_at_period_end: boolean;
    canceled_at: Date | null;
    customer: string; 
    default_payment_method: string | null;
    price_id: string; 
}