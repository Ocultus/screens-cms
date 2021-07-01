export class JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
