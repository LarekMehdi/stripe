import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";

@Injectable()
export class PaymentRefundUseCase {
    constructor(private readonly paymentService: PaymentService) {}

    async execute(subscriptionId: number) {

    }

}