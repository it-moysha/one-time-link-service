import { z } from 'zod';

/**
 * Создание одноразовой ссылки
 * [POST] api/links
 */
export const zodResponseLinkPost = z.object({
    url: z.string().url()
});
export type TResponseLinkPost = z.infer<typeof zodResponseLinkPost>;

/**
 * Получение значения по ссылке
 * [GET] api/links/:linkId
 */
export const zodResponseLinkGet = z.object({
    text: z.string().min(1)
});
export type TResponseLinkGet = z.infer<typeof zodResponseLinkGet>;
