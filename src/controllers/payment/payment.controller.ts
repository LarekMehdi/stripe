import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PaymentCheckoutUseCase } from "src/application/use-cases/payment/checkout.usecase";
import { ExtendedCheckoutSessionInputDto } from "src/shared/dtos/stripe/checkout/checkout-session-input.dto";
import { SmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/small-checkout-input.dto";

@Controller('payment')
export class PaymentController {
    constructor(private readonly checkoutUC: PaymentCheckoutUseCase) {}

    @Post(':productId/checkout')
    async checkout(@Param('productId', ParseIntPipe) productId: number, @Body() checkoutData: SmallCheckoutInputDto) {
        return await this.checkoutUC.execute(checkoutData, productId);
    }



    @Get('success')
    success(): string {
        return 'success';
    }

    @Get('cancel')
    cancel(): string {
        return 'operation cancelled';
    }

}