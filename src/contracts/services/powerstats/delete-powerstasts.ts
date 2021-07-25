export interface IDeletePowerstats {
  execute: (params: IDeletePowerstats.Params) => Promise<IDeletePowerstats.Result>
}

export namespace IDeletePowerstats {
  export type Params = {
    powerstatsId: string
    heroId: string
  }

  export type Result = {
    heroExists: boolean
    deleted: boolean
  }
}
