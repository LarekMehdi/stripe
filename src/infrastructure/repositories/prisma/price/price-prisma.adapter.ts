import { Price } from "src/domain/entities/price/price.entity";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { CreatePriceInputDto } from "src/shared/dtos/price/create-price-input.dto";
import { PrismaService } from "../.config/prisma.service";
import { Currency } from "src/shared/constantes/currency.enum";
import { Injectable } from "@nestjs/common";
import { PriceMapper } from "src/shared/mappers/price.mapper";

@Injectable()
export class PricePrismaAdapter implements PriceRepository {
    constructor(private readonly prismaService: PrismaService) {}

    /** FIND **/

    async findById(id: number): Promise<Price | null> {
        const prismaPrice = await this.prismaService.price.findUnique({
            where: {
                id
            }
        });
        if (!prismaPrice) return null;
        return {
            ...prismaPrice,
            currency: prismaPrice.currency as Currency
        }
    }

    /** FIND ALL **/

    async findAllByIds(ids: number[]): Promise<Price[]> {
        const prismaPrices = await this.prismaService.price.findMany({
            where: {
                productId: {
                    in: ids
                }
            }
        });

        return PriceMapper.mapPrismaPricesToDomainPrices(prismaPrices);
    }

    /** CREATE **/

    async create(data: CreatePriceInputDto): Promise<Price> {
        const prismaPrice = await this.prismaService.price.create({
            data
        });
        return {
            ...prismaPrice,
            currency: prismaPrice.currency as Currency
        }
    }
    
}