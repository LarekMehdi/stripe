import { PriceType } from "@prisma/client";
import { RecurringInterval } from "src/shared/constantes/subscription.enum";

export class ProductOutputDto {
    id:                 number;
    name:               string;
    quantity:           number;
    price?:             number;
    externalPriceId:    string | null;
    externalProductId:  string | null;
    type:               PriceType;
    interval?:          RecurringInterval;
    intervalCount?:     Number;
}