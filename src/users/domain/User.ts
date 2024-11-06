export class User {
  constructor(
    public id: string | null,
    public firstName: string,
    public lastName: string,
    public dateOfBirth: Date,
    public phone: string,
    public occupation: string,
    public email: string,
    public password: string
  ) {}
}
