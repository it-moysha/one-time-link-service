import { PrismaService } from 'libs/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkRepository {
    constructor(private readonly prismaService: PrismaService) {}

    createLink(text: string) {
        return this.prismaService.link.create({
            select: { id: true },
            data: { text }
        });
    }

    findLinkById(linkId: string) {
        return this.prismaService.link.findUnique({
            select: { text: true },
            where: {
                id: linkId,
                deletedAt: null
            }
        });
    }

    setDeletedLink(linkId: string) {
        return this.prismaService.link.update({
            data: { deletedAt: new Date().toISOString() },
            where: { id: linkId }
        });
    }
}
