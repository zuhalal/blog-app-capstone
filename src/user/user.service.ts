import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/providers/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: number) {
    return await this.prismaService.user.findFirst({
      where: { id },
    })
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: { email },
    })
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return await this.prismaService.user.update({ data, where: { id } })
  }
}
