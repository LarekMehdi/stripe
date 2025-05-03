export class StripeWebhookOutputDto {
    id: string;
    type: string;               // "payment_intent.succeeded", "payment_intent.payment_failed", ect...
    created: number;
    data: {                     // Données de l'objet concerné par l'événement (ex: payment_intent, charge, etc.)
        object: StripeCheckoutSession | StripePaymentIntent | StripeCharge | StripeCustomer; 
    };
}

export class StripeCheckoutSession {
    id: string;
    object: 'checkout.session';
    payment_intent: string;
    amount_total: number;
    currency: string;
    customer?: string;
    payment_status: 'paid' | 'unpaid';
}

export class StripePaymentIntent {
    id: string;
    object: 'payment_intent';
    amount: number;
    currency: string;
    status: 'succeeded' | 'pending' | 'failed';
    customer?: string;
    payment_method?: string;
    receipt_email?: string;
    metadata?: Record<string, any>;
}

export class StripeCharge {
    id: string;
    object: 'charge';
    amount: number;
    currency: string;
    status: 'succeeded' | 'failed' | 'pending';
    payment_intent?: string;
    customer?: string;
    receipt_email?: string;
}

export class StripeCustomer {
    id: string;
    object: 'customer';
    email: string;
    description?: string;
    metadata?: Record<string, any>;
}