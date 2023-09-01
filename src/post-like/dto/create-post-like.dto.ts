import { ApiProperty } from '@nestjs/swagger'
import { LikeType } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class CreatePostLikeDto {
  @ApiProperty({ enum: LikeType, example: LikeType.LIKE })
  @IsEnum(LikeType)
  likeType: LikeType
}
