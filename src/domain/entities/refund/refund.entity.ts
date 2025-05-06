import { Currency } from "src/shared/constantes/currency.enum";
import { RefundReason, RefundStatus } from "src/shared/constantes/payment.enum";

export class Refund {
    id:                 number;
    externalId:         string;
    externalChargeId?:  string
    paymentIntentId?:   string;
    amount:             number;
    currency:           Currency;
    status:             RefundStatus;
    reason?:            RefundReason;
    createdAt:          Date;
}