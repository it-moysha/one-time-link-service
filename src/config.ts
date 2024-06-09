import * as dotenv from 'dotenv';
import * as process from 'process';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    PORT: z.coerce.number().min(1),
    DATABASE_URL: z.string().min(1),
    SITE_URL: z.string().url()
});

const parseConfig = configSchema.safeParse(process.env);

if (!parseConfig.success) {
    console.error(parseConfig['error']);
    process.exit(1);
}

export const config = parseConfig.data;
