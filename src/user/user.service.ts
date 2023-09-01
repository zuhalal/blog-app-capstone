import { Injectable } from '@nestjs/common'
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
}
