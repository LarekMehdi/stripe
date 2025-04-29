import { Injectable } from "@nestjs/common";
import { HashService } from "src/domain/services/hash.service";

@Injectable()
export class BcryptService implements HashService {
    // Example of domain implementation in infrastructure

    // async generate(password: string): Promise<string> {
    //     const saltRounds = 10;
    //     const salt = await bcrypt.genSalt(saltRounds);
    //     return await bcrypt.hash(password, salt);
    // }
}