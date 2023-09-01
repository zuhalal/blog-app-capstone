import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { AppSharedModule } from 'src/shared/index.module'

@Module({
  imports: [AppSharedModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
