import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/providers/prisma.service'

@Injectable()
export class PostLikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PostLikeCreateInput) {
    return await this.prismaService.postLike.create({ data })
  }

  async findOneByPostAndUserId(userId: number, postId: string) {
    return await this.prismaService.postLike.findFirst({
      where: { postId, userId },
    })
  }

  async remove(id: number) {
    return await this.prismaService.postLike.delete({
      where: {
        id,
      },
    })
  }
}
