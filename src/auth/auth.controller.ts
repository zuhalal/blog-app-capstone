import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
import { UtilsService } from 'src/shared/utils/util.service'
import { AuthResponse } from './auth.dto'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LocalAuthGuard } from './guards/local.guard'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilService: UtilsService
  ) {}

  @ApiResponse({
    status: 201,
    description: 'Login Success',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 403,
    description: 'Wrong Credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req: Request, @Res() response: Response) {
    try {
      const login = await this.authService.login(req.user)
      return response.status(200).json({
        data: login,
        message: 'Data successfully retrieved.',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }

  @Post('/register')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async register(@Body() dto: RegisterDto, @Res() response: Response) {
    try {
      const body: Prisma.UserCreateInput = {
        ...dto,
        createdAt: new Date(),
      }

      const register = await this.authService.register(body)

      return response.status(200).json({
        data: register,
        message: 'Data successfully retrieved.',
        status: true,
      })
    } catch (error) {
      console.log(error)
      return await this.utilService.catchError(error, response)
    }
  }
}
