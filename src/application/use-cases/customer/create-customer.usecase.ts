import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Customer } from "src/domain/entities/customer/customer.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { StripeCustomerOutputDto } from "src/shared/dtos/stripe/customer/stripe-customer-output.dto";

@Injectable()
export class CreateCustomerUseCase {
    constructor( private readonly customerRepository: CustomerRepository,
                    private readonly paymentService: PaymentService
    ) {}

    async execute(data: CreateCustomerInputDto): Promise<Customer> {
        const stripeCustomer: StripeCustomerOutputDto | undefined = await this.paymentService.createCustomer(data);
        if (!stripeCustomer) throw new ServiceUnavailableException('Create customer => Something went wrong with Stripe');

        data.externalId = stripeCustomer.id;
        return await this.customerRepository.create(data);
    }
}