export class ApiErrorResponse {
  constructor(
    public Status: number,
    public Title = 'Application request has failed',
    public Type = 'GeneralAppRequest',
    public Detail = 'The application has failed to make a request to the server, please try again',
    public Errors?: Map<string, string[]>,
    public Extensions?: Map<string, object | null>,
    public Instance?: string
  ) {}
}
