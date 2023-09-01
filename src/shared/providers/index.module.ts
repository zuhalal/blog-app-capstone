import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service'
import { PrismaService } from './prisma.service'

@Module({
  providers: [PrismaService, CloudinaryService],
  exports: [PrismaService, CloudinaryService],
})
export class ProvidersModule {}
