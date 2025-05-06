import { Module } from '@nestjs/common';

// Domain
import { ProductRepository } from './domain/repositories/product.repository';
import { PriceRepository } from './domain/repositories/price.repository';
import { CustomerRepository } from './domain/repositories/customer.repository';
import { SubscriptionRepository } from './domain/repositories/subscription.repository';

// Application (Use cases)
import { PaymentCheckoutUseCase } from './application/use-cases/payment/checkout.usecase';
import { CreateProductUseCase } from './application/use-cases/product/create-product.usecase';
import { CreatePriceUseCase } from './application/use-cases/price/create-price.usecase';
import { PriceFindByIdUseCase } from './application/use-cases/price/price-find-by-id.usecase';
import { PaymentCheckoutMultipleUseCase } from './application/use-cases/payment/checkout-multiple.usecase';
import { PaymentCheckoutResponseUseCase } from './application/use-cases/payment/checkout-response.usecase';
import { CreateCustomerUseCase } from './application/use-cases/customer/create-customer.usecase';
import { CustomerFindByIdUseCase } from './application/use-cases/customer/customer-find-by-id.usecase';
import { ProductFindAllUseCase } from './application/use-cases/product/product-find-all.usecase';
import { SubscriptionCancelUseCase } from './application/use-cases/subscription/subscription-cancel.usecase';
import { PaymentRefundUseCase } from './application/use-cases/payment/payment-refund.usecase';

// Infrastructure (Concrete implementation)
import { PrismaModule } from './infrastructure/repositories/prisma/.config/prisma.module';
import { ProductPrismaAdapter } from './infrastructure/repositories/prisma/product/product-prisma.adapter';
import { PricePrismaAdapter } from './infrastructure/repositories/prisma/price/price-prisma.adapter';
import { CustomerPrismaAdapter } from './infrastructure/repositories/prisma/customer/customer-prisma.adapter';
import { SubscriptionPrismaAdapter } from './infrastructure/repositories/prisma/subscription/subscription-prisma.adapter';

// Controllers
import { PaymentController } from './controllers/payment/payment.controller';
import { ProductController } from './controllers/product/product.controller';
import { PriceController } from './controllers/price/price.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { SubscriptionController } from './controllers/subscription/subscription.controller';

// Services
import { StripeService } from './infrastructure/services/payment/stripe-payment.service';
import { PaymentService } from './domain/services/payment.service';



@Module({
  imports: [
    // Import necessary modules here
    PrismaModule,

  ],
  controllers: [
    // Controllers (entry points – e.g., HTTP)
    PaymentController,
    ProductController,
    PriceController,
    CustomerController,
    SubscriptionController,
  ],
  providers: [
    // Use cases (Application layer)
    PaymentCheckoutUseCase,
    PaymentCheckoutMultipleUseCase,
    PaymentCheckoutResponseUseCase,
    PaymentRefundUseCase,
    CreateProductUseCase,
    ProductFindAllUseCase,
    CreatePriceUseCase,
    PriceFindByIdUseCase,
    CreateCustomerUseCase,
    CustomerFindByIdUseCase,
    SubscriptionCancelUseCase,

    // Concrete implementations (Infrastructure layer)
    ProductPrismaAdapter,
    StripeService,

    // Bind domain abstractions to infrastructure implementations
    {
      provide: ProductRepository,
      useClass: ProductPrismaAdapter,
    },
    {
      provide: PriceRepository,
      useClass: PricePrismaAdapter,
    },
    {
      provide: CustomerRepository,
      useClass: CustomerPrismaAdapter,
    },
    {
      provide: SubscriptionRepository,
      useClass: SubscriptionPrismaAdapter,
    },
    {
      provide: PaymentService,
      useClass: StripeService,
    },
  ],
})
export class AppModule {}
