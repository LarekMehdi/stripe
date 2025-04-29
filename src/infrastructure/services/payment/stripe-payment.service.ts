import { Injectable } from "@nestjs/common";
import { PaymentService } from "src/domain/services/payment.service";

@Injectable()
export class StripeService implements PaymentService {

    async checkout(): Promise<any> {
        return '';
    }
    
    // Example of domain implementation in infrastructure

    // async generate(password: string): Promise<string> {
    //     const saltRounds = 10;
    //     const salt = await bcrypt.genSalt(saltRounds);
    //     return await bcrypt.hash(password, salt);
    // }
}