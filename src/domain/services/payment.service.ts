import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";

export abstract class PaymentService {
    
    abstract checkout(data: ExtendedCheckoutSessionInputDto): Promise<any>
}