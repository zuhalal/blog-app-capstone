import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/shared/providers/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)

    const isMatch = await bcrypt.compare(pass, user?.password ?? '')

    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = {
      sub: user?.id,
    }

    return {
      token: this.jwtService.sign(payload),
      data: user,
      status: true,
    }
  }

  async register(data: Prisma.UserCreateInput) {
    const saltOrRounds = 10

    const password = data.password
    const newPassword = await bcrypt.hash(password, saltOrRounds)

    const newData = {
      ...data,
      password: newPassword,
    }
    return await this.prismaService.user.create({ data: newData })
  }
}
