import { Currency } from "src/shared/constantes/currency.enum";

export class StripePriceOutputDto {
    id: string;
    currency: string;
    product: string;
    unit_amount: number;
    type: string;
    billing_scheme: string;
}