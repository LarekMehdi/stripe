import { Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PaymentCheckoutUseCase } from "src/application/use-cases/payment/checkout.usecase";

@Controller('payment')
export class PaymentController {
    constructor(private readonly checkoutUC: PaymentCheckoutUseCase) {}

    @Post(':productId/checkout')
    checkout(@Param('productId', ParseIntPipe) productId: number) {
        return this.checkoutUC.execute(productId);
    }
}