import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { CreateStripeProductInputDto } from "src/shared/dtos/stripe/product/create-stripe-product-input.dto";
import { StripeProductOutputDto } from "src/shared/dtos/stripe/product/stripe-product-output.dto";

export abstract class PaymentService {
    
    abstract createProduct(createData: CreateProductInputDto): Promise<StripeProductOutputDto|undefined>
    abstract checkout(data: ExtendedCheckoutSessionInputDto): Promise<any>
}