import { Injectable } from '@nestjs/common';
import { TRequestLinkPost } from '../../common/type/http/request/link.request';
import { LinkRepository } from './link.repository';
import { config } from '../../config';
import { ClientException } from '../../common/exception/client-exception';

@Injectable()
export class LinkService {
    constructor(private readonly linkRepository: LinkRepository) {}

    async createLink(body: TRequestLinkPost) {
        const link = await this.linkRepository.createLink(body.text);
        return config.SITE_URL + '/secret/' + link.id;
    }

    async getTextLink(linkId: string) {
        const link = await this.linkRepository.findLinkById(linkId);
        if (!link) {
            throw new ClientException({ message: 'Ссылка недействительна' });
        }

        await this.linkRepository.setDeletedLink(linkId);
        return link.text;
    }
}
