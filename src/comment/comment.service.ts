import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/providers/prisma.service'

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.CommentCreateInput) {
    return await this.prismaService.comment.create({ data })
  }

  async findAll(postId: string) {
    console.log(postId)

    return await this.prismaService.comment.findMany({
      where: {
        postId,
      },
    })
  }

  async findOneByPostId(postId: string) {
    return await this.prismaService.comment.findFirst({
      where: { postId },
    })
  }

  async update(id: number, data: Prisma.CommentUpdateInput) {
    return await this.prismaService.comment.update({ data, where: { id } })
  }

  async remove(id: number) {
    return await this.prismaService.comment.delete({ where: { id } })
  }
}
