import * as dotenv from 'dotenv';

dotenv.config();

export const APPLICATION_PORT = +process.env.APPLICATION_PORT;
export const CRYPTO_ROUND = +process.env.CRYPTO_ROUND;
