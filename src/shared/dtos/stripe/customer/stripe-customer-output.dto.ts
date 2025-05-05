export class StripeCustomerOutputDto {
    id: string;
    email: string|null;
    metadata?: Record<string, string>
    balance: number;
}