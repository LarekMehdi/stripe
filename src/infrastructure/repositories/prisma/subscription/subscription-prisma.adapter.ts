import { Injectable } from "@nestjs/common";
import { Subscription } from "src/domain/entities/subscription.entity";
import { SubscriptionRepository } from "src/domain/repositories/subscription.repository";
import { CreateSubscriptionInputDto } from "src/shared/dtos/stripe/subscription/create-subscription-input.dto";
import { PrismaService } from "../.config/prisma.service";
import { SubscriptionStatus } from "src/shared/constantes/subscription.enum";

@Injectable()
export class SubscriptionPrismaAdapter implements SubscriptionRepository {
    constructor(private readonly prismaService: PrismaService) {}

    /** CREATE **/

    async create(data: CreateSubscriptionInputDto): Promise<Subscription> {
        const prismaSub = await this.prismaService.subscription.create({
            data
        });
        return {
            ...prismaSub,
            status: prismaSub.status as SubscriptionStatus
        }
    }

}