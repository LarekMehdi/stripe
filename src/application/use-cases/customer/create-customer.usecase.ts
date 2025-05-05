import { Injectable } from "@nestjs/common";
import { Customer } from "src/domain/entities/customer/customer.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";

@Injectable()
export class CreateCustomerUseCase {
    constructor( private readonly customerRepository: CustomerRepository) {}

    async execute(data: CreateCustomerInputDto): Promise<Customer> {
        return await this.customerRepository.create(data);
    }
}