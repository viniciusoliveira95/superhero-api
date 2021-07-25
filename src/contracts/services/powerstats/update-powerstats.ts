export interface IUpdatePowerstats {
  execute: (data: IUpdatePowerstats.Params) => Promise<IUpdatePowerstats.Result>
}

export namespace IUpdatePowerstats {
  export type Params = {
    powerstatsId: string
    heroId: string
    name: string
    value: number
  }

  export type Result = {
    updated: boolean
    heroExists: boolean
  }
}
