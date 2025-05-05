import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { Customer } from "../entities/customer/customer.entity";

export abstract class CustomerRepository {
    abstract findById(id: number): Promise<Customer|null>
    abstract create(data: CreateCustomerInputDto): Promise<Customer>
}