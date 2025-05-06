import { Injectable } from "@nestjs/common";
import { Customer } from "@prisma/client";
import { Price } from "src/domain/entities/price/price.entity";
import { Product } from "src/domain/entities/product/product.entity";
import { CustomerRepository } from "src/domain/repositories/customer.repository";
import { PriceRepository } from "src/domain/repositories/price.repository";
import { ProductRepository } from "src/domain/repositories/product.repository";
import { SubscriptionRepository } from "src/domain/repositories/subscription.repository";
import { PaymentService } from "src/domain/services/payment.service";
import { CreateCustomerInputDto } from "src/shared/dtos/customer/create-customer-input.dto";
import { CheckoutProductOutputDto } from "src/shared/dtos/stripe/checkout/checkout-product-output.dto";
import { CreateSubscriptionInputDto } from "src/shared/dtos/stripe/subscription/create-subscription-input.dto";
import { StripeSubscriptionOutputDto } from "src/shared/dtos/stripe/subscription/stripe-subscription-output.dto";
import { SubscriptionMapper } from "src/shared/mappers/subscription.mapper";

@Injectable()
export class PaymentCheckoutResponseUseCase {
    constructor(private readonly productRepository: ProductRepository,
                private readonly paymentService: PaymentService,
                private readonly customerRepository: CustomerRepository,
                private readonly priceRepository: PriceRepository,
                private readonly subscriptionRepository: SubscriptionRepository,
    ) {}

    async execute(response: any):  Promise<Product[]|null> {
        switch (response.type) {
            case 'checkout.session.completed':

                console.log('response webhook => ', response);
                const cart: CheckoutProductOutputDto[] = JSON.parse(response.data.object.metadata.cart);
                const products: Partial<Product>[] = this.__mapDtoToProducts(cart);

                // creation de subscription
                if (response.data.object.mode === 'subscription') {
                    const externalCustomerId: string = response.data.object.customer;
                    const externalSubscriptionId: string = response.data.object.subscription;

                    // récupération de la subscription complete de stripe
                    const stripeSubscription = await this.paymentService.findSubcriptionByExternalId(externalSubscriptionId);

                    if (!stripeSubscription) break;
                    const subscription: StripeSubscriptionOutputDto = SubscriptionMapper.mapStripeSubscriptionToDto(stripeSubscription);
                    const customer: Customer = await this.__createCustomerIfNeeded(externalCustomerId);
                    const price: Price|null = await this.priceRepository.findByExternalId(subscription.price_id);

                    const subscriptionData: CreateSubscriptionInputDto|null = SubscriptionMapper.mapStripeSubscriptionToSubscriptionInput(subscription, customer?.id, price?.id);
                    if (!subscriptionData) break;
                    await this.subscriptionRepository.create(subscriptionData);
                }
                return await this.productRepository.updateMany(products);
      
            case 'payment_intent.payment_failed':
                // envoyer un mail?
            break;

            case 'checkout.session.expired':
                // vider un panier, libérer des produits reservés, ect...
            break;

            default:
                return null;
        }
        return null;
    }

    private __mapDtoToProducts(dtos: CheckoutProductOutputDto[]): Partial<Product>[] {
        const products: Partial<Product>[] = [];
        for (const dto of dtos) {
            const product: Partial<Product> = {
                id: dto.id,
                quantity: dto.newQuantity
            }
            products.push(product);
        }
        return products;

    }

    private async __createCustomerIfNeeded(externalId: string): Promise<Customer> {
        const customer: Customer|null = await this.customerRepository.findbyExternalId(externalId);

        if (!customer) {
            const stripeCustomer = await this.paymentService.findCustomerByExternalId(externalId);
            const prismaCustomer: CreateCustomerInputDto = {
                name: stripeCustomer.name,
                email: stripeCustomer.email,
                externalId: externalId
            }
            const created: Customer = await this.customerRepository.create(prismaCustomer);
            return created;
        }
        return customer;
    }
}