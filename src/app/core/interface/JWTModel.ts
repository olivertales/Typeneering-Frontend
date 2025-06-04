export class JWTModel {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public expiresIn: number,
  ) {}
}
