import { Injectable } from '@nestjs/common'
import { CreateRepostedPostDto } from './dto/create-reposted-post.dto'
import { UpdateRepostedPostDto } from './dto/update-reposted-post.dto'

@Injectable()
export class RepostedPostService {
  create(createRepostedPostDto: CreateRepostedPostDto) {
    return 'This action adds a new repostedPost'
  }

  findAll() {
    return `This action returns all repostedPost`
  }

  findOne(id: number) {
    return `This action returns a #${id} repostedPost`
  }

  update(id: number, updateRepostedPostDto: UpdateRepostedPostDto) {
    return `This action updates a #${id} repostedPost`
  }

  remove(id: number) {
    return `This action removes a #${id} repostedPost`
  }
}
