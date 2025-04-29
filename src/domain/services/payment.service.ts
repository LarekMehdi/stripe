export abstract class PaymentService {
    
    abstract checkout(): Promise<any>
}