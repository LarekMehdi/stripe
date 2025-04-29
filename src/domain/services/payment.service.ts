import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { CreateStripePriceInputDto } from "src/shared/dtos/stripe/price/create-stripe-price-input.dto";
import { StripePriceOutputDto } from "src/shared/dtos/stripe/price/stripe-price-output.dto";
import { CreateStripeProductInputDto } from "src/shared/dtos/stripe/product/create-stripe-product-input.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";

export abstract class PaymentService {
    
    abstract createProduct(createData: CreateProductInputDto): Promise<StripeProductOutputDto|undefined>
    abstract createPrice(createData: CreatePriceInputDto): Promise<StripePriceOutputDto|undefined>
    abstract checkout(data: ExtendedCheckoutSessionInputDto): Promise<any>
}