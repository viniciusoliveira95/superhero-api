export interface ICreatePowerstatsRepository {
  create: (heroData: ICreatePowerstatsRepository.Params) => Promise<ICreatePowerstatsRepository.Result>
}

export namespace ICreatePowerstatsRepository {
  export type Params = {
    name: string
    value: number
  }
  export type Result = boolean
}
