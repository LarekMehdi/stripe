import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateCustomerUseCase } from "src/application/use-cases/customer/create-customer.usecase";
import { CustomerFindByIdUseCase } from "src/application/use-cases/customer/customer-find-by-id.usecase";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";

@Controller('customer')
export class CustomerController {
    constructor( private readonly createCustomerUC: CreateCustomerUseCase,
                private readonly customerFindByIdUC: CustomerFindByIdUseCase,
    ) {}

    /** CREATE **/

    @Post()
    async create(@Body() customerData: CreateCustomerInputDto) {
        return await this.createCustomerUC.execute(customerData);
    }

    /** FIND **/

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return await this.customerFindByIdUC.execute(id);
    }
}