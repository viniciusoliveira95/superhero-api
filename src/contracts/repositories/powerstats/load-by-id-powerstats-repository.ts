import { PowerstatsModel } from '@/contracts/models'

export interface ILoadByIdPowerstatsRepository {
  loadById: (data: ILoadByIdPowerstatsRepository.Param) => Promise<ILoadByIdPowerstatsRepository.Result>
}

export namespace ILoadByIdPowerstatsRepository {
  export type Result = PowerstatsModel
  export type Param = {
    heroId: string
    powerstatsId: string
  }
}
