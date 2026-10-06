import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from '../config/database.config';
import { validateEnvironment } from '../config/env.validation';

config({ path: resolve(__dirname, '../../.env') });

const environment = validateEnvironment(process.env);

export default new DataSource(
  getDatabaseConfig(new ConfigService(environment)),
);
