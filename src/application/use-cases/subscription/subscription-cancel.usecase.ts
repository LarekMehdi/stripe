import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { Subscription } from "src/domain/entities/subscription/subscription.entity";
import { SubscriptionRepository } from "src/domain/repositories/subscription.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { SubscriptionStatus } from "src/shared/constantes/subscription.enum";

@Injectable()
export class SubscriptionCancelUseCase {
    constructor(private readonly paymentService: PaymentService,
                private readonly subscriptionRepository: SubscriptionRepository
    ) {}

    async execute(subscriptionId: number) {
        const subscription: Subscription|null = await this.subscriptionRepository.findById(subscriptionId);
        if (!subscription) throw new NotFoundException(`No subscription found for id ${subscriptionId}`);

        const externalId: string = subscription.externalId;
        const cancelled = await this.paymentService.cancelSubscription(externalId);
        if (!cancelled || !cancelled.canceled_at) throw new ServiceUnavailableException(`Something went wrong with Stripe [cancelSubscription]`)
        console.log('cancelled => ', cancelled);
    
        subscription.status = SubscriptionStatus.CANCELED;
        subscription.canceledAt = new Date(cancelled?.canceled_at * 1000);

        return await this.subscriptionRepository.update(subscription);

        
    }

}