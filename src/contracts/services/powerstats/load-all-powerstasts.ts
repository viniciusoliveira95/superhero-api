import { PowerstatsModel } from '@/contracts/models'

export interface ILoadAllPowerstats {
  execute: (powerstats: ILoadAllPowerstats.Params) => Promise<ILoadAllPowerstats.Result>
}

export namespace ILoadAllPowerstats {
  export type Params = {
    heroId: string
  }

  export type Result = {
    heroExists: boolean
    powerstats: PowerstatsModel[]
  }
}
