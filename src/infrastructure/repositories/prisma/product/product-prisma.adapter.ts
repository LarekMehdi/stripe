import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/entities/product/product.entity";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { PrismaService } from "../.config/prisma.service";

@Injectable()
export class ProductPrismaAdapter implements ProductRepository {
    constructor(private readonly prismaService: PrismaService) {}
 
    /** FIND **/

    async findById(id: number): Promise<Product | null> {
        return await this.prismaService.product.findUnique({
            where: {
                id
            }
        });
    }

    /** FIND ALL **/

    async findAll(): Promise<Product[]> {
        return await this.prismaService.product.findMany({

        });
    }

    async findAllByIds(ids: number[]): Promise<Product[]> {
        return await this.prismaService.product.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }
  

    /** CREATE **/

    async create(data: CreateProductInputDto): Promise<Product> {
        return await this.prismaService.product.create({
            data
        });
    }

    /** UPDATE **/

    async update(data: Partial<CreateProductInputDto>, id: number): Promise<Product> {
        return await this.prismaService.product.update({
            data,
            where: {
                id
            }
        });
    }

    async updateMany(datas: Partial<Product>[]): Promise<Product[]> {
        console.log('updateMany => ', datas);
        return await Promise.all(
            datas.map(d => (
                this.prismaService.product.update({
                    where: {
                        id: d?.id,
                    },
                    data: {
                        quantity: d?.quantity
                    }
                })
            ))
        );
    }

}