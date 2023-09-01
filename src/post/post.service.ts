import { Injectable } from '@nestjs/common'
import { LikeType, Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/providers/prisma.service'

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PostCreateInput) {
    return await this.prismaService.post.create({ data })
  }

  async findAll() {
    const res = await this.prismaService.post.findMany({
      include: {
        likes: true,
      },
    })

    return res.map((post) => {
      const finalRes = {
        ...post,
        likeCount: post.likes.filter((like) => like.type === LikeType.LIKE)
          .length,
        dislikeCount: post.likes.filter(
          (like) => like.type === LikeType.DISLIKE
        ).length,
      }

      delete finalRes.likes
      return finalRes
    })
  }

  async findAllMyPost(userId: number) {
    const res = await this.prismaService.post.findMany({
      include: {
        likes: true,
      },
      where: {
        userId,
      },
    })

    return res.map((post) => {
      const finalRes = {
        ...post,
        likeCount: post.likes.filter((like) => like.type === LikeType.LIKE)
          .length,
        dislikeCount: post.likes.filter(
          (like) => like.type === LikeType.DISLIKE
        ).length,
      }

      delete finalRes.likes
      return finalRes
    })
  }

  async findOne(id: string) {
    return await this.prismaService.post.findFirst({
      where: { id },
    })
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    return await this.prismaService.post.update({ data, where: { id } })
  }

  async remove(id: string) {
    return await this.prismaService.post.delete({ where: { id } })
  }
}
