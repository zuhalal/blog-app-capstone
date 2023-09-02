import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { CloudinaryService } from 'src/shared/providers/cloudinary.service'
import { UtilsService } from 'src/shared/utils/util.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly utilService: UtilsService
  ) {}

  @Patch('/')
  @UseInterceptors(FileInterceptor('picture'))
  async update(
    @Body() dto: UpdateUserDto,
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

      const oldData = await this.userService.findOne(request?.user?.userId)

      if (!oldData) {
        return response.status(401).json({
          status: 'success',
          message: 'User not found',
          data: null,
        })
      }

      if (picture) {
        const image = await this.cloudinaryService.uploadFile(picture)

        if (oldData?.photoPublicId) {
          await this.cloudinaryService.destroyFile(oldData.photoPublicId)
        }

        Object.assign(body, {
          photoUrl: image.secure_url,
          photoPublicId: image.public_id,
        })
      }

      const updatedPosition = await this.userService.update(
        request?.user?.userId,
        body
      )
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
}
