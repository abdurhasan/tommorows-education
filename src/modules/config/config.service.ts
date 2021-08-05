import { from } from 'env-var';
import { config } from 'dotenv';

config({ path: '.env' });

export class ConfigService {
  private env = from(process.env);

  public readonly NODE_ENV = this.env.get('NODE_ENV').required().asString();
  public readonly PORT = this.env.get('PORT').required().asPortNumber();

  public readonly DATABASE_URL = this.env
    .get('DATABASE_URL')
    .required()
    .asString();

  public readonly JWT_SECRET_KEY = this.env
    .get('JWT_SECRET_KEY')
    .required()
    .asString();
}
