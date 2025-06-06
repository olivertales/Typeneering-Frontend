export class ApiErrorResponse {
  constructor(
    public Title: string,
    public Type: string,
    public Detail: string,
    public Errors?: Map<string, string[]>,
    public Extensions?: Map<string, object | null>,
    public Status?: number,
    public Instance?: string
  ) {}
}
