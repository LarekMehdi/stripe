import { Currency } from "src/shared/constantes/currency.enum";

export class Price {
    id: number;
    amount: number;
    currency: Currency;
    productId: number;
    externalProductId: string | null;
    externalPriceId: string | null;
}