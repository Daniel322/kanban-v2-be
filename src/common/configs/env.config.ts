import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

const env = registerAs('env', () => ({
  type: process.env.NODE_ENV,
}));

const db = registerAs('db', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}));

const throttle = registerAs('throttle', () => ({
  ttl: process.env.THROTTLE_TTL,
  limit: process.env.THROTTLE_LIMIT,
}));

const redis = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: process.env.REDIS_TTL,
}));

const salt = registerAs('salt', () => ({
  rounds: process.env.SALT_ROUNDS,
}));

const jwt = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTtl: Number(process.env.JWT_ACCESS_TTL),
  refreshTtl: Number(process.env.JWT_REFRESH_TTL),
}));

export const EnvConfig = {
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  envFilePath: '.env.development',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),

    THROTTLE_TTL: Joi.string().required(),
    THROTTLE_LIMIT: Joi.string().required(),

    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.string().required(),
    REDIS_TTL: Joi.string().required(),

    SALT_ROUNDS: Joi.string().required(),

    JWT_ACCESS_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_ACCESS_TTL: Joi.number().required(),
    JWT_REFRESH_TTL: Joi.number().required(),
  }),
  load: [env, db, throttle, redis, salt, jwt],
};
