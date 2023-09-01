import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
  @IsEmail()
  @IsString()
  email: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  password: string
}
