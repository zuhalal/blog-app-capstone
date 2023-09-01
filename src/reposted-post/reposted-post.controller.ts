import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { RepostedPostService } from './reposted-post.service'
import { CreateRepostedPostDto } from './dto/create-reposted-post.dto'
import { UpdateRepostedPostDto } from './dto/update-reposted-post.dto'

@Controller('reposted-post')
export class RepostedPostController {
  constructor(private readonly repostedPostService: RepostedPostService) {}

  @Post()
  create(@Body() createRepostedPostDto: CreateRepostedPostDto) {
    return this.repostedPostService.create(createRepostedPostDto)
  }

  @Get()
  findAll() {
    return this.repostedPostService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repostedPostService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepostedPostDto: UpdateRepostedPostDto
  ) {
    return this.repostedPostService.update(+id, updateRepostedPostDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repostedPostService.remove(+id)
  }
}
