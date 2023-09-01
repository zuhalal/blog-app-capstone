import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class AuthLoginDto {
  @ApiProperty({ type: String, example: 'karyawan@gmail.com' })
  @IsEmail()
  email: string

  @ApiProperty({ type: String, example: 'abcdef' })
  @IsString()
  password: string
}

class AuthData {
  @ApiProperty({ type: Number, example: 1 })
  id: number

  @ApiProperty({ example: 'Zuhal' })
  firstName: string

  @ApiProperty({ example: 'Hadi' })
  lastName: string

  @ApiProperty({ example: 'zuhal@gmail.com' })
  email: string

  @ApiProperty({ example: '2013-03-06T00:00:00.000Z' })
  birthDate: string

  @ApiProperty({ example: 'abcdef' })
  photoUrl: string

  @ApiProperty({ example: 'abcdef' })
  photoPublicId: string

  @ApiProperty({ example: '2023-03-06T16:37:07.000Z' })
  createdAt: string

  @ApiProperty({ example: '2023-06-10T11:51:49.650Z' })
  updatedAt?: string
}

export class AuthResponse {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string

  @ApiProperty()
  data: AuthData

  @ApiProperty({ type: Boolean })
  status: boolean
}

// Logout response DTO
export class LogoutResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  status: boolean
  @ApiProperty({ type: String, example: 'Logout Successful' })
  message: string
}
