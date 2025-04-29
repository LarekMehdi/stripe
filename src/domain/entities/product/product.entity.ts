export interface Product {
    id: number;
    name: string;
    externalPriceId: string | null;
    externalProductId: string | null;
    quantity: number;
}