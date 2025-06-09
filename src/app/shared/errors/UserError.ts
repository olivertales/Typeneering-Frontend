export class UserError extends Error {
  constructor() {
    super()
    this.name = 'Unexpected user error'
    this.message = 'Error in fetching current user'
  }
}
