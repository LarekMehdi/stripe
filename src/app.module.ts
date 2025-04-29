import { Module } from '@nestjs/common';

// Domain
import { ProductRepository } from './domain/repositories/product.repository';
import { PriceRepository } from './domain/repositories/price.repository';

// Application (Use cases)
import { PaymentCheckoutUseCase } from './application/use-cases/payment/checkout.usecase';
import { CreateProductUseCase } from './application/use-cases/product/create-product.usecase';
import { CreatePriceUseCase } from './application/use-cases/price/create-price.usecase';
import { PriceFindByIdUseCase } from './application/use-cases/price/price-find-by-id.usecase';

// Infrastructure (Concrete implementation)
import { PrismaModule } from './infrastructure/repositories/prisma/.config/prisma.module';
import { ProductPrismaAdapter } from './infrastructure/repositories/prisma/product/product-prisma.adapter';
import { PricePrismaAdapter } from './infrastructure/repositories/prisma/price/price-prisma.adapter';

// Controllers
import { PaymentController } from './controllers/payment/payment.controller';
import { ProductController } from './controllers/product/product.controller';
import { PriceController } from './controllers/price/price.controller';

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

  ],
  providers: [
    // Use cases (Application layer)
    PaymentCheckoutUseCase,
    CreateProductUseCase,
    CreatePriceUseCase,
    PriceFindByIdUseCase,

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
      provide: PaymentService,
      useClass: StripeService,
    },
  ],
})
export class AppModule {}
