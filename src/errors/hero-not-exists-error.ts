export class HeroNotExistsError extends Error {
  constructor () {
    super('This hero does not exists')
    this.name = 'HeroNotExistsError'
  }
}
