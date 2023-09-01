import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common'
import { UtilsService } from 'src/shared/utils/util.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Prisma } from '@prisma/client'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@UseGuards(JwtAuthGuard)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly utilService: UtilsService
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'New comment successfully created',
    // type: ResponseCreatePositionDto,
  })
  // @ApiBody({ type: CreatePositionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/')
  async create(
    @Body() dto: CreateCommentDto,
    @Res() response: Response,
    @Req() request: any
  ) {
    try {
      const body: Prisma.CommentCreateInput = {
        value: dto.value,
        post: {
          connect: {
            id: dto.postId,
          },
        },
        user: {
          connect: {
            id: request.user?.userId,
          },
        },
        createdAt: new Date(),
      }

      const newComment = await this.commentService.create(body)

      return response.status(200).json({
        data: newComment,
        message: 'New post successfully created.',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Data successfully retrieved',
    // type: ResponseFindPositionDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/:postid')
  async findOne(@Param('postId') postId: string, @Res() response: Response) {
    try {
      const comment = await this.commentService.findOneByPostId(postId)

      return response.status(200).json({
        comment,
        message: !comment
          ? 'Data is not found.'
          : 'Data successfully retrieved.',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Data successfully updated',
    // type: ResponseUpdatePositionDto,
  })
  @ApiBody({ type: UpdateCommentDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Patch('/:id')
  async update(
    @Body() dto: UpdateCommentDto,
    @Param('id') id: string,
    @Res() response: Response
  ) {
    try {
      const body = {
        ...dto,
        updatedAt: new Date(),
      }

      const updatedComment = await this.commentService.update(+id, body)
      return response.status(200).json({
        data: updatedComment,
        message: 'Data successfully updated',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Data successfully deleted',
    // type: ResponseDeletePostDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    try {
      const deleteComment = await this.commentService.remove(+id)

      return response.status(200).json({
        deleteComment,
        message: !deleteComment
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
