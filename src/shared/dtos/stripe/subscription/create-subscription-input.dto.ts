import { SubscriptionStatus } from "@prisma/client";

export class CreateSubscriptionInputDto {
    externalId: string;
    status: SubscriptionStatus;
    startDate: Date;
    cancelAt: Date | null;
    cancelAtPeriodEnd: boolean;
    canceledAt: Date | null;
    customerId: number;
    priceId: number;
}