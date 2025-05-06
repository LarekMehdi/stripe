import { CreateSubscriptionInputDto } from "src/shared/dtos/stripe/subscription/create-subscription-input.dto";
import { Subscription } from "../entities/subscription.entity";

export abstract class SubscriptionRepository {

    abstract create(data: CreateSubscriptionInputDto): Promise<Subscription>
}