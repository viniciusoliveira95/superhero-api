export interface IHeroRequestValidation {
  validate: (request: IHeroRequestValidation.Params) => IHeroRequestValidation.Result
}

export namespace IHeroRequestValidation {
  export type Params = {
    name: string
    description: string
    rank: number
    active: boolean
  }

  export type Result = Error
}
