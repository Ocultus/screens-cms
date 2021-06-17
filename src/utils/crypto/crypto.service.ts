import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';
import { CRYPTO_ROUND } from 'src/config/configuration';

@Injectable()
export class CryptoService {
  async getHashPassword(password: string) {
    const salt = await genSalt(CRYPTO_ROUND);
    return await hash(password, salt);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}
