export enum RefundStatus {
    OPEN = 'open',
    COMPLETE = 'complete',
    EXPIRED = 'expired'
}

export enum RefundReason {
    DUPLICATE = 'duplicate',
    FRAUDULENT = 'fraudulent',
    REQUESTED_BY_CUSTOMER = 'requested_by_customer',
    EXPIRED_UNCAPTURED_CHARGE = 'expired_uncaptured_charge'
}