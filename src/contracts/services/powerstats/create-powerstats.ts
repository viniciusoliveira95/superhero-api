export interface ICreatePowerstats {
  execute: (powerstats: ICreatePowerstats.Params) => Promise<ICreatePowerstats.Result>
}

export namespace ICreatePowerstats {
  export type Params = {
    heroId: string
    name: string
    value: number
  }

  export type Result = {
    created: boolean
    heroExists: boolean
  }
}
