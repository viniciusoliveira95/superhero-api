export interface IPowerstatsRequestValidation {
  validate: (request: any) => IPowerstatsRequestValidation.Result
}

export namespace IPowerstatsRequestValidation {
  export type Result = Error
}
