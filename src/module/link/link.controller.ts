import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ZodPipe } from '../../common/pipe/zod';
import { TRequestLinkPost, zodRequestLinkPost } from '../../common/type/http/request/link.request';
import { LinkService } from './link.service';
import { ValidateResponseWithZod } from '../../common/validation/zod';
import { zodResponseLinkGet, zodResponseLinkPost } from '../../common/type/http/response/link.response';

@Controller('links')
export class LinkController {
    constructor(private readonly linkService: LinkService) {}

    @Post()
    @ValidateResponseWithZod(zodResponseLinkPost)
    async createLink(@Body(new ZodPipe(zodRequestLinkPost)) body: TRequestLinkPost) {
        const url = await this.linkService.createLink(body);
        return { url };
    }

    @Get('/:linkId')
    @ValidateResponseWithZod(zodResponseLinkGet)
    async getTextLink(@Param('linkId') linkId: string) {
        const text = await this.linkService.getTextLink(linkId);
        return { text };
    }
}
