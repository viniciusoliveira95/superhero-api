import { PowerstatsModel } from '@/contracts/models'

export interface ILoadByIdPowerstats {
  execute: (params: ILoadByIdPowerstats.Params) => Promise<ILoadByIdPowerstats.Result>
}

export namespace ILoadByIdPowerstats {
  export type Params = {
    powerstatsId: string
    heroId: string
  }

  export type Result = {
    heroExists: boolean
    powerstats: PowerstatsModel
  }
}
