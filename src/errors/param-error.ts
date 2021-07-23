export class ParamError extends Error {
  constructor (params: string[]) {
    super(`Params with errors: ${params.join(', ')}`)
    this.name = 'ParamError'
  }
}
