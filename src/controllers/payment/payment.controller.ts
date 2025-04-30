import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PaymentCheckoutMultipleUseCase } from "src/application/use-cases/payment/checkout-multiple.usecase";
import { PaymentCheckoutUseCase } from "src/application/use-cases/payment/checkout.usecase";
import { MultipleSmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/multiple-small-checkout-input.dto";
import { SmallCheckoutInputDto } from "src/shared/dtos/stripe/checkout/small-checkout-input.dto";

@Controller('payment')
export class PaymentController {
    constructor(private readonly checkoutUC: PaymentCheckoutUseCase,
                private readonly checkoutMultipleUC: PaymentCheckoutMultipleUseCase,
    ) {}

    @Post(':productId/checkout')
    async checkout(@Param('productId', ParseIntPipe) productId: number, @Body() checkoutData: SmallCheckoutInputDto) {
        return await this.checkoutUC.execute(checkoutData, productId);
    }

    @Post('checkout')
    async checkoutMultiple(@Body() checkoutDatas: MultipleSmallCheckoutInputDto ) {
        return await this.checkoutMultipleUC.execute(checkoutDatas);
    }



    /** REDIRECTION **/

    @Get('success')
    success(): string {
        return 'success';
    }

    @Get('cancel')
    cancel(): string {
        return 'operation cancelled';
    }

}