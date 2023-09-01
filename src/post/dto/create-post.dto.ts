import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty({
    type: String,
    example: 'Top 3 Big Company to Interns',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    type: String,
    example: 'Top 3 Big Company to Interns',
  })
  @IsString()
  @IsNotEmpty()
  content: string
}
