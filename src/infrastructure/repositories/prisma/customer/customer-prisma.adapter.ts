import { Customer } from "src/domain/entities/customer/customer.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { PrismaService } from "../.config/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerPrismaAdapter implements CustomerRepository {
    constructor( private readonly prismaService: PrismaService) {}

    /** FIND **/

    async findById(id: number): Promise<Customer | null> {
        return await this.prismaService.customer.findUnique({
            where: {
                id
            }
        });
    }

    async findbyExternalId(externalId: string): Promise<Customer | null> {
        return await this.prismaService.customer.findUnique({
            where: {
                externalId
            }
        })
    }
    
    /** CREATE **/

    async create(data: CreateCustomerInputDto): Promise<Customer> {
        return await this.prismaService.customer.create({
            data
        });
    }
    
}