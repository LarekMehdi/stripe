import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";

@Injectable()
export class PaymentCheckoutUseCase {
    constructor(private readonly paymentService: PaymentService) {}
    
    public async execute(productId: number) {
        // get product => priceId

        // checkout stripe
        return await this.paymentService.checkout();
    }
}