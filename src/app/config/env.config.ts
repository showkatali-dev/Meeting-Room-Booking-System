import 'dotenv/config';

export const {
  PORT: port,
  MONGO_URI: mongo_uri,
  BCRYPT_SALT_ROUND: bcrypt_salt_rounds,
  JWT_SECRET: jwt_secret,
  JWT_EXPIRE_IN: jwt_expire_in,
  NODE_ENVIRONMENT: node_env,
} = process.env;
