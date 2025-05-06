import { PriceType } from "src/shared/constantes/subscription.enum";

export class PriceOutputDto {
    id: number;
    externalId: string;
    amount: number;
    externalAmount: number;
    type: PriceType;
}