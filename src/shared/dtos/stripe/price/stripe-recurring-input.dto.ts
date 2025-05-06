import { RecurringInterval } from "src/shared/constantes/subscription.enum";

export class StripeRecurringInputDto {
    interval: RecurringInterval;
    interval_count: number;
}