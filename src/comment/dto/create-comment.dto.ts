import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    example: 'Very amazing',
  })
  @IsString()
  @IsNotEmpty()
  value: string

  @ApiProperty({
    type: String,
    example: '3',
  })
  @IsString()
  @IsNotEmpty()
  postId: string
}
