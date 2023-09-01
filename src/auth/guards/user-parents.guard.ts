import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class UserParentsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest()

    return user?.isUserParent
  }
}
