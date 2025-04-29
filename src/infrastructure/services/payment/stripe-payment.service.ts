import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";

@Injectable()
export class StripeService implements PaymentService {

    async checkout(): Promise<any> {
        return '';
    }

   
}