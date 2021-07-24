import { HeroModel } from '@/contracts/models'

export interface ILoadAllHeroesRepository {
  loadAll: () => Promise<ILoadAllHeroesRepository.Result>
}

export namespace ILoadAllHeroesRepository {
  export type Result = HeroModel[]
}
