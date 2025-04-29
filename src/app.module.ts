import { Module } from '@nestjs/common';

// Domain
import { ProductRepository } from './domain/repositories/product.repository';

// Application (Use cases)
import { PaymentCheckoutUseCase } from './application/use-cases/payment/checkout.usecase';

// Infrastructure (Concrete implementation)
import { PrismaModule } from './infrastructure/repositories/prisma/.config/prisma.module';
import { UserPrismaAdapter } from './infrastructure/repositories/prisma/user/user-prisma.adapter';
import { ProductPrismaAdapter } from './infrastructure/repositories/prisma/product/product-prisma.adapter';

// Controllers
import { AuthController } from './controllers/auth/auth.controller';
import { PaymentController } from './controllers/payment/payment.controller';

// Services
import { StripeService } from './infrastructure/services/payment/stripe-payment.service';
import { PaymentService } from './domain/services/payment.service';
import { CreateProductUseCase } from './application/use-cases/product/create-product.usecase';

@Module({
  imports: [
    // Import necessary modules here
    PrismaModule,

  ],
  controllers: [
    // Controllers (entry points – e.g., HTTP)
    AuthController,
    PaymentController,

  ],
  providers: [
    // Use cases (Application layer)
    PaymentCheckoutUseCase,
    CreateProductUseCase,

    // Concrete implementations (Infrastructure layer)
    UserPrismaAdapter,
    StripeService,

    // Bind domain abstractions to infrastructure implementations
    {
      provide: ProductRepository,
      useClass: ProductPrismaAdapter,
    },
    {
      provide: PaymentService,
      useClass: StripeService,
    },
  ],
})
export class AppModule {}
