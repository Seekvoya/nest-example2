import * as dotenv from 'dotenv';

dotenv.config();

class EnvConfig {
  get app() {
    return {
      port: parseInt(process.env.APP_PORT) || 8888,
    };
  }

  get security() {
    return {
      saltPassword: process.env.PASSWORD_SALT,
    };
  }

  get jwt() {
    return {
      userSecret: process.env.JWT_ACCESS_USER_TOKEN_SECRET,
      userExpireTime: process.env.JWT_ACCESS_USER_TOKEN_EXPIRE_TIME || '30d',

      adminSecret: process.env.JWT_ACCESS_ADMIN_TOKEN_SECRET,
      adminExpireTime: process.env.JWT_ACCESS_ADMIN_TOKEN_EXPIRE_TIME || '30d',
    };
  }

  get db() {
    return {
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
    };
  }

  get mailer() {
    return {
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
      from: process.env.MAIL_FROM,
      server: process.env.MAIL_SERVER,
      password: process.env.MAIL_PASSWORD,
    };
  }
}

export default new EnvConfig();
