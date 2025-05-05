import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { PaymentCheckoutMultipleUseCase } from "src/application/use-cases/payment/checkout-multiple.usecase";
import { PaymentCheckoutResponseUseCase } from "src/application/use-cases/payment/checkout-response.usecase";
import { PaymentCheckoutUseCase } from "src/application/use-cases/payment/checkout.usecase";
import { MultipleSmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/multiple-small-checkout-input.dto";
import { SmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/small-checkout-input.dto";

@Controller('payment')
export class PaymentController {
    constructor(private readonly checkoutUC: PaymentCheckoutUseCase,
                private readonly checkoutMultipleUC: PaymentCheckoutMultipleUseCase,
                private readonly checkoutResponseUC: PaymentCheckoutResponseUseCase,
    ) {}

    /** CHECKOUT **/
    
    @Post(':productId/checkout')
    async checkout(@Param('productId', ParseIntPipe) productId: number, @Body() checkoutData: SmallCheckoutInputDto) {
        return await this.checkoutUC.execute(checkoutData, productId);
    }

    @Post('checkout')
    async checkoutMultiple(@Body() checkoutDatas: MultipleSmallCheckoutInputDto ) {
        return await this.checkoutMultipleUC.execute(checkoutDatas);
    }



    /** REDIRECTION **/

    @Post('webhook')
    async webhook(@Req() req: Request, @Body() response: any): Promise<void> { // StripeWebhookOutputDto
        await this.checkoutResponseUC.execute(response);
    }

    @Get('success')
    success(): string {
        return 'success';
    }

    @Get('cancel')
    cancel(): string {
        return 'operation cancelled';
    }

    // stripe listen --forward-to http://localhost:3000/payment/webhook
    // stripe listen -e payment_intent.succeeded --forward-to localhost:3000/payment/webhook
    // stripe listen -e checkout.session.completed --forward-to localhost:3000/payment/webhook
    // paiement refusé => 4000 0000 0000 9995
    //paiement accepté => 4242 4242 4242 4242

}