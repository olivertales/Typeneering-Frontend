export class CookieError extends Error {
  constructor() {
    super()
    this.message = 'Could not save value'
    this.cause = 'Please check if your cookies are disabled'
    this.name = 'CookieDisabledException'
  }
}
