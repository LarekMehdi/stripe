import { Injectable } from "@nestjs/common";
import { Customer } from "src/domain/entities/customer/customer.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";

@Injectable()
export class CustomerFindByIdUseCase {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async execute(id: number): Promise<Customer | null> {
        return await this.customerRepository.findById(id);
    }
}