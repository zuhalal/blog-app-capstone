import { Module } from '@nestjs/common'
import { PostLikeService } from './post-like.service'
import { PostLikeController } from './post-like.controller'
import { AppSharedModule } from 'src/shared/index.module'

@Module({
  imports: [AppSharedModule],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
