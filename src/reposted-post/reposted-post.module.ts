import { Module } from '@nestjs/common'
import { RepostedPostService } from './reposted-post.service'
import { RepostedPostController } from './reposted-post.controller'

@Module({
  controllers: [RepostedPostController],
  providers: [RepostedPostService],
})
export class RepostedPostModule {}
