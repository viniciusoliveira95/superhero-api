export interface IDeletePowerstatsRepository {
  delete: (data: IDeletePowerstatsRepository.Param) => Promise<IDeletePowerstatsRepository.Result>
}

export namespace IDeletePowerstatsRepository {
  export type Param = {
    heroId: string
    powerstatsId: string
  }
  export type Result = boolean
}
