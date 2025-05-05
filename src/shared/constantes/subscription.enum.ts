export enum PriceType {
    ONE_TIME = 'one_time',
    RECURRING = 'recurring'
}

export enum RecurringInterval {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year'
}

export enum SubscriptionStatus {
    INCOMPLETE = 'incomplete',
    INCOMPLETE_EXPIRED = 'incomplete_expired',
    TRIALING = 'trialing',
    ACTIVE = 'active',
    PAST_DUE = 'past_due',
    CANCELED = 'canceled',
    UNPAID = 'unpaid',
    PAUSED = 'paused'
}

