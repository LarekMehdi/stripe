import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { PrismaService } from "../.config/prisma.service";

@Injectable()
export class ProductPrismaAdapter implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<Product | null> {
        return await this.prismaService.product.findUnique({
            where: {
                id
            }
        });
    }

    async create(data: CreateProductInputDto): Promise<Product> {
        return await this.prismaService.product.create({
            data
        });
    }

}