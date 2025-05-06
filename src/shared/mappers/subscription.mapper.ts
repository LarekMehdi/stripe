import Stripe from "stripe";
import { StripeSubscriptionOutputDto } from "../dtos/stripe/subscription/stripe-subscription-output.dto";
import { CreateSubscriptionInputDto } from "../dtos/stripe/subscription/create-subscription-input.dto";
import { SubscriptionStatus } from "@prisma/client";

export abstract class SubscriptionMapper {

    static mapStripeSubscriptionToDto(stripeSub: Stripe.Subscription): StripeSubscriptionOutputDto {
        const priceId = stripeSub.items?.data?.[0]?.price?.id;

        const dto: StripeSubscriptionOutputDto = {
            id: stripeSub.id!,
            status: stripeSub.status!,
            start_date: new Date(stripeSub.start_date! * 1000),
            cancel_at: stripeSub.cancel_at ? new Date(stripeSub.cancel_at * 1000) : null,
            cancel_at_period_end: stripeSub.cancel_at_period_end!,
            canceled_at: stripeSub.canceled_at ?  new Date(stripeSub.canceled_at * 1000) : null,
            customer: stripeSub.customer as string,
            default_payment_method: stripeSub.default_payment_method as string,
            price_id: priceId ?? ''
        }
        return dto;
    }

    static mapStripeSubscriptionToSubscriptionInput(stripeSub: StripeSubscriptionOutputDto, customerId?: number, priceId?: number): CreateSubscriptionInputDto|null {
        if (!customerId || !priceId) return null;
        const dto: CreateSubscriptionInputDto = {
            externalId: stripeSub.id,
            status: stripeSub.status as SubscriptionStatus,
            startDate: stripeSub.start_date,
            cancelAt: stripeSub.cancel_at,
            cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
            canceledAt: stripeSub.canceled_at,
            customerId: customerId,
            priceId: priceId
        }
        return dto;
    }
}