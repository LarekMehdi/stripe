import Stripe from "stripe";
import { StripePriceOutputDto } from "../dtos/stripe/price/stripe-price-output.dto";
import { Price as DomainPrice} from "src/domain/entities/price/price.entity";
import { Price as PrismaPrice} from "@prisma/client";
import { Currency } from "../constantes/currency.enum";


export abstract class PriceMapper {

    static mapPriceResponseToPriceOutput(data: Stripe.Response<Stripe.Price>): StripePriceOutputDto {
        const price: StripePriceOutputDto = {
            id: data.id,
            currency: data.currency,
            product: typeof data.product === 'string' ? data.product : data.product.id,
            unit_amount: data.unit_amount ?? 0,
            type: data.type,
            billing_scheme: data.billing_scheme
        }
        return price;
    }

    static mapPrismaPricesToDomainPrices(prismaPrices: PrismaPrice[]): DomainPrice[] {
        const domainPrices: DomainPrice[] = [];
        
        for (const price of prismaPrices) {
            const domainPrice: DomainPrice = {
                id: price.id,
                amount: price.amount,
                currency: price.currency as Currency,
                productId: price.productId,
                externalProductId: price.externalProductId,
                externalPriceId: price.externalPriceId
            }
            domainPrices.push(domainPrice);
        }
        return domainPrices;
    }
}