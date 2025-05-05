export class ProductOutputDto {
    id: number;
    name: string;
    quantity: number;
    price?: number;
    externalPriceId: string | null;
    externalProductId: string | null;
}