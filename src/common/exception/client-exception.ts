import { HttpException } from '@nestjs/common';

export class ClientException extends HttpException {
    constructor(payload: { message: string }) {
        super(payload, 400);
    }
}
