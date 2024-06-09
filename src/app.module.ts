import { Module } from '@nestjs/common';
import { LinkModule } from './module/link/link.module';

@Module({
    imports: [LinkModule]
})
export class AppModule {}
