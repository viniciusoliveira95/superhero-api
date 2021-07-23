export interface IHeroRequestValidation {
  validate: (request: any) => IHeroRequestValidation.Result
}

export namespace IHeroRequestValidation {
  export type Result = Error
}
