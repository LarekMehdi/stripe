import { Injectable } from "@nestjs/common";
import { User } from "src/domain/entities/user/user.entity";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "../.config/prisma.service";

@Injectable()
export class UserPrismaAdapter implements UserRepository {
    // Example of domain implementation in infrastructure

    constructor(private readonly prismaService: PrismaService) {}

    // async findById(id: number): Promise<User | null> {
    //     return await this.prismaService.user.findUnique({
    //         where: {
    //             id
    //         }
    //     })
    // }
}