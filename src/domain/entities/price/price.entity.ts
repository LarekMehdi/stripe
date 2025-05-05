import { Currency } from "src/shared/constantes/currency.enum";
import { PriceType, RecurringInterval } from "src/shared/constantes/subscription.enum";

export class Price {
    id:                 number;
    amount:             number;
    currency:           Currency;
    productId:          number;
    externalProductId:  string | null;
    externalPriceId:    string | null;
    type:               PriceType;
    interval?:          RecurringInterval;
    intervalCount?:     Number;
}