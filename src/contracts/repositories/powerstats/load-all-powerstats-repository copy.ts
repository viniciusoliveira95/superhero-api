import { PowerstatsModel } from '@/contracts/models'

export interface ILoadAllPowerstatsRepository {
  loadAll: (heroId: ILoadAllPowerstatsRepository.Param) => Promise<ILoadAllPowerstatsRepository.Result>
}

export namespace ILoadAllPowerstatsRepository {
  export type Result = PowerstatsModel[]
  export type Param = string
}
