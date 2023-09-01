import { Module } from '@nestjs/common'
import { ProvidersModule } from './providers/index.module'
import { UtilsModule } from './utils/index.module'

@Module({
  imports: [ProvidersModule, UtilsModule],
  exports: [ProvidersModule, UtilsModule],
})
export class AppSharedModule {}
