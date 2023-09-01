import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { AppSharedModule } from 'src/shared/index.module'

@Module({
  imports: [AppSharedModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
