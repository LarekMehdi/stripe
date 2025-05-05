import { Customer } from "src/domain/entities/customer/customer.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { PrismaService } from "../.config/prisma.service";

export class CustomerPrismaAdapter implements CustomerRepository {
    constructor( private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<Customer | null> {
        return await this.prismaService.customer.findUnique({
            where: {
                id
            }
        });
    }
    
    async create(data: CreateCustomerInputDto): Promise<Customer> {
        return await this.prismaService.customer.create({
            data
        });
    }
    
}