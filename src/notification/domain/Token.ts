export class Token {
  constructor(
    public id: string,
    public userId: string,
    public code: string,
    public createdAt: Date,
    public expiresAt: Date,
    public status: "active" | "used" | "expired"
  ) {}
}
