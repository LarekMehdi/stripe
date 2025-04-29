export class ProductOutputDto {
    id: number;
    name: string;
    quantity: number;
    externalPriceId: string | null;
    externalProductId: string | null;
}