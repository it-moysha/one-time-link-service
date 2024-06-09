import { Module } from '@nestjs/common';
import { PrismaModule } from 'libs/prisma';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { LinkRepository } from './link.repository';

@Module({
    controllers: [LinkController],
    providers: [LinkService, LinkRepository],
    imports: [PrismaModule]
})
export class LinkModule {}
