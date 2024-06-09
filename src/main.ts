import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './common/filter/zod-catch';

async function main() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new ZodFilter());
    app.setGlobalPrefix('/api');

    await app.listen(3000);
}
main();
