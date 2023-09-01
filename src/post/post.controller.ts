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
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
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
import { CloudinaryService } from 'src/shared/providers/cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly utilService: UtilsService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'New post successfully created',
    // type: ResponseCreatePositionDto,
  })
  // @ApiBody({ type: CreatePositionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Post('/')
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Body() dto: CreatePostDto,
    @Res() response: Response,
    @Req() request: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: RegExp('.(jpg|jpeg|png)$'),
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    picture: Express.Multer.File
  ) {
    try {
      const image = await this.cloudinaryService.uploadFile(picture)
      const body: Prisma.PostCreateInput = {
        title: dto.title,
        content: dto.content,
        userCreator: {
          connect: {
            id: request.user?.userId,
          },
        },
        photoUrl: image.secure_url,
        photoPublicId: image.public_id,
        createdAt: new Date(),
      }

      const newPosition = await this.postService.create(body)

      return response.status(200).json({
        data: newPosition,
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
    // type: ResponseFindManyPositionDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('/')
  async findAll(@Res() response: Response) {
    try {
      const data = await this.postService.findAll()

      return response.status(200).json({
        data: data,
        message:
          data.length < 0 ? 'Data is Empty.' : 'Data successfully retrieved.',
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
  @Get('/detail/:id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const data = await this.postService.findOne(id)

      return response.status(200).json({
        data,
        message: !data ? 'Data is not found.' : 'Data successfully retrieved.',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }

  @Get('/user')
  async findAllMyPost(
    @Param('id') id: string,
    @Res() response: Response,
    @Req() request: any
  ) {
    try {
      const data = await this.postService.findAllMyPost(request?.user?.userId)

      return response.status(200).json({
        data: data,
        message:
          data.length < 0 ? 'Data is Empty.' : 'Data successfully retrieved.',
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
  @ApiBody({ type: UpdatePostDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseInterceptors(FileInterceptor('picture'))
  @Patch('/:id')
  async update(
    @Body() dto: UpdatePostDto,
    @Param('id') id: string,
    @Res() response: Response,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: RegExp('.(jpg|jpeg|png)$'),
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        })
    )
    picture?: Express.Multer.File
  ) {
    try {
      const body = {
        ...dto,
        updatedAt: new Date(),
      }

      const oldData = await this.postService.findOne(id)

      if (!oldData) {
        return response.status(401).json({
          status: 'success',
          message: 'Post not found',
          data: null,
        })
      }

      if (picture) {
        const image = await this.cloudinaryService.uploadFile(picture)
        await this.cloudinaryService.destroyFile(oldData.photoPublicId)
        Object.assign(body, {
          photoUrl: image.secure_url,
          photoPublicId: image.public_id,
        })
      }

      const updatedPosition = await this.postService.update(id, body)
      return response.status(200).json({
        data: updatedPosition,
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
      const oldData = await this.postService.findOne(id)

      if (!oldData) {
        return response.status(401).json({
          status: 'success',
          message: 'Post not found',
          data: null,
        })
      }

      await this.cloudinaryService.destroyFile(oldData.photoPublicId)
      const deletePost = await this.postService.remove(id)

      return response.status(200).json({
        deletePost,
        message: !deletePost
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
