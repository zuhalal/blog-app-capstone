import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common'
import { PostLikeService } from './post-like.service'
import { CreatePostLikeDto } from './dto/create-post-like.dto'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { UtilsService } from 'src/shared/utils/util.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'

@UseGuards(JwtAuthGuard)
@ApiTags('post-like')
@Controller('post-like')
export class PostLikeController {
  constructor(
    private readonly postLikeService: PostLikeService,
    private readonly utilService: UtilsService
  ) {}

  @Post('/')
  async create(
    @Body() dto: CreatePostLikeDto,
    @Res() response: Response,
    @Req() request: any,
    @Query('post_id') postId: string
  ) {
    try {
      const postLike = await this.postLikeService.findOneByPostAndUserId(
        request?.user?.userId,
        postId
      )

      if (postLike) {
        const deleteComment = await this.postLikeService.remove(postLike.id)

        return response.status(200).json({
          deleteComment,
          message: !deleteComment
            ? 'Data is not found'
            : 'Data successfully deleted',
          status: true,
        })
      }

      const body: Prisma.PostLikeCreateInput = {
        createdAt: new Date(),
        post: {
          connect: {
            id: postId,
          },
        },
        type: dto.likeType,
        user: {
          connect: {
            id: request.user?.userId,
          },
        },
      }

      const newPostLike = await this.postLikeService.create(body)

      return response.status(200).json({
        newPostLike,
        message: !newPostLike
          ? 'Data is not found'
          : 'Data successfully deleted',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }
}
