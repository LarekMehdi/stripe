import { Module } from '@nestjs/common';

// Domain
import { UserRepository } from './domain/repositories/user.repository';

// Application (Use cases)
import { AuthSignupUseCase } from './application/use-cases/auth/signup.usecase';

// Infrastructure (Concrete implementation)
import { PrismaModule } from './infrastructure/repositories/prisma/.config/prisma.module';
import { UserPrismaAdapter } from './infrastructure/repositories/prisma/user/user-prisma.adapter';

// Controllers
import { AuthController } from './controllers/auth/auth.controller';
import { PaymentController } from './controllers/payment/payment.controller';

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
    AuthSignupUseCase,

    // Concrete implementations (Infrastructure layer)
    UserPrismaAdapter,

    // Bind domain abstractions to infrastructure implementations
    {
      provide: UserRepository,
      useClass: UserPrismaAdapter,
    },
  ],
})
export class AppModule {}
