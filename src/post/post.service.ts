import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/shared/providers/prisma.service'

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PostCreateInput) {
    return await this.prismaService.post.create({ data })
  }

  async findAll() {
    return await this.prismaService.post.findMany()
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
