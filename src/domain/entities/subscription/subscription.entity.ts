import { SubscriptionStatus } from "src/shared/constantes/subscription.enum";

export class Subscription {
    id: number;
    externalId: string;
    status: SubscriptionStatus;
    startDate: Date;
    cancelAt: Date | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: Date | null;
    customerId: number;
    priceId: number;
}