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

  @ApiProperty({ example: 315123312672 })
  nik: number

  @ApiProperty({ example: 'Karyawan' })
  fullName: string

  @ApiProperty({ example: 813512123 })
  phone: number

  @ApiProperty({ example: 'MALE' })
  gender: string

  @ApiProperty({ example: 'karyawan@gmail.com' })
  email: string

  @ApiProperty({ example: '2013-03-06T00:00:00.000Z' })
  birthDate: string

  @ApiProperty({ example: 'Jalan Lorem Ipsum' })
  address: string

  @ApiProperty({ example: '/assets/' })
  filePath: string

  @ApiProperty({ example: 'abc.jpg' })
  fileName: string

  @ApiProperty({ example: true })
  isActive: boolean

  @ApiProperty({ example: false })
  isDeleted: boolean

  @ApiProperty({ example: '2023-03-06T16:37:07.000Z' })
  createdAt: string

  @ApiProperty({ example: null })
  createdBy: string

  @ApiProperty({ example: '2023-06-10T11:51:49.650Z' })
  updatedAt?: string

  @ApiProperty({ example: '1' })
  updatedBy?: string

  @ApiProperty({ example: '2023-06-10T12:47:25.342Z' })
  lastLogin: string

  @ApiProperty({ example: true })
  isLogin: boolean

  @ApiProperty({ example: null })
  refId: number

  @ApiProperty({ example: 2 })
  positionId: number

  @ApiProperty({ example: 3 })
  organizationId: number
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
