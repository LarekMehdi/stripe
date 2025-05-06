import { Controller, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { SubscriptionCancelUseCase } from "src/application/use-cases/subscription/subscription-cancel.usecase";

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionCancelUC: SubscriptionCancelUseCase) {}

    @Patch(':id')
    async cancelSubscription(@Param('id', ParseIntPipe) id: number) {
        return await this.subscriptionCancelUC.execute(id);
    }
}