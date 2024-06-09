import {
    applyDecorators,
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
    UseInterceptors
} from '@nestjs/common';
import { z } from 'zod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ZodValidationInterceptor implements NestInterceptor {
    constructor(private readonly schema: z.ZodSchema<any>) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const validationResult = this.schema.safeParse(data);
                if (validationResult.success) {
                    return validationResult.data;
                } else {
                    throw {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: validationResult['error'],
                        schema: this.schema
                    };
                }
            })
        );
    }
}

export function ValidateResponseWithZod(schema: z.ZodSchema<any>) {
    return applyDecorators(UseInterceptors(new ZodValidationInterceptor(schema)));
}
