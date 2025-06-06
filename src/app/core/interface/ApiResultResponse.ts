export class ApiResultResponse {
  constructor(
    public title: string,
    public message: string
  ) {}
}

export class ApiResultResponseList<T> {
  constructor(
    public title: string,
    public message: string,
    public data: T[],
    public totalCount: number
  ) {}
}
