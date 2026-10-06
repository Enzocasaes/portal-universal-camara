import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export function getDatabaseConfig(
  config: ConfigService,
): PostgresConnectionOptions {
  const extension = __filename.endsWith('.ts') ? 'ts' : 'js';

  return {
    type: 'postgres',
    host: config.getOrThrow<string>('DATABASE_HOST'),
    port: config.getOrThrow<number>('DATABASE_PORT'),
    database: config.getOrThrow<string>('DATABASE_NAME'),
    username: config.getOrThrow<string>('DATABASE_USER'),
    password: config.getOrThrow<string>('DATABASE_PASSWORD'),
    synchronize: false,
    migrationsRun: false,
    entities: [
      resolve(__dirname, `../modules/**/*.entity.${extension}`).replace(
        /\\/g,
        '/',
      ),
    ],
    migrations: [
      resolve(__dirname, `../database/migrations/*.${extension}`).replace(
        /\\/g,
        '/',
      ),
    ],
  };
}
