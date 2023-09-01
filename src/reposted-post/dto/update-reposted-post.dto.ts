import { PartialType } from '@nestjs/swagger'
import { CreateRepostedPostDto } from './create-reposted-post.dto'

export class UpdateRepostedPostDto extends PartialType(CreateRepostedPostDto) {}
