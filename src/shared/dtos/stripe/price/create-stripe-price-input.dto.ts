import { Currency } from "src/shared/constantes/currency.enum";

export class CreateStripePriceInputDto {
    currency: string;
    product: string; // product_id
    unit_amount: number; // price * 100
}