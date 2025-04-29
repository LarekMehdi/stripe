import { CreateProductInputDto } from "src/shared/dtos/product/create-product-input.dto";
import { Product } from "../entities/product/product.entity";

export abstract class ProductRepository {

    abstract findById(id: number): Promise<Product|null>
    abstract create(data: CreateProductInputDto): Promise<Product>
}