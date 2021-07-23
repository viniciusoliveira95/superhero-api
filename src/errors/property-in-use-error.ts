export class PropertyInUseError extends Error {
  constructor (properties: string[]) {
    super(`Properties already used: ${properties.join(', ')}`)
    this.name = 'PropertyInUseError'
  }
}
