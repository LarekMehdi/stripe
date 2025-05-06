import { Injectable } from "@nestjs/common";
import { Subscription as DomainSubscription } from "src/domain/entities/subscription.entity";
import { SubscriptionRepository } from "src/domain/repositories/subscription.repository";
import { CreateSubscriptionInputDto } from "src/shared/dtos/stripe/subscription/create-subscription-input.dto";
import { PrismaService } from "../.config/prisma.service";
import { SubscriptionStatus } from "src/shared/constantes/subscription.enum";
import { Subscription as PrismaSubscription} from "@prisma/client";

@Injectable()
export class SubscriptionPrismaAdapter implements SubscriptionRepository {
    constructor(private readonly prismaService: PrismaService) {}

    /** FIND **/

    async findById(id: number): Promise<DomainSubscription|null> {
        const prismaSubscription: PrismaSubscription|null = await this.prismaService.subscription.findUnique({
            where: {
                id
            }
        });

        if (!prismaSubscription) return null;
        return {
            ...prismaSubscription,
            status: prismaSubscription.status as SubscriptionStatus
        }
    }

    /** CREATE **/

    async create(data: CreateSubscriptionInputDto): Promise<DomainSubscription> {
        const prismaSub: PrismaSubscription = await this.prismaService.subscription.create({
            data
        });
        return {
            ...prismaSub,
            status: prismaSub.status as SubscriptionStatus
        }
    }

    /** UPDATE **/

    async update(data: DomainSubscription): Promise<DomainSubscription> {
        const prismaSub: PrismaSubscription = await this.prismaService.subscription.update({
            data,
            where: {
                id: data.id
            }
        });
        return {
            ...prismaSub,
            status: prismaSub.status as SubscriptionStatus
        }
    }

}