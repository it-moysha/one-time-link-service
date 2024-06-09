import { z } from 'zod';

/**
 * Создание одноразовой ссылки
 * [POST] api/links
 */
export const zodRequestLinkPost = z.object({
    text: z.string().min(1)
});
export type TRequestLinkPost = z.infer<typeof zodRequestLinkPost>;
