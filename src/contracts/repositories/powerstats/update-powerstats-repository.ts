export interface IUpdatePowerstatsRepository {
  update: (powerstatsData: IUpdatePowerstatsRepository.Params) => Promise<IUpdatePowerstatsRepository.Result>
}

export namespace IUpdatePowerstatsRepository {
  export type Params = {
    powerstatsId: string
    heroId: string
    name: string
    value: number
  }
  export type Result = boolean
}
