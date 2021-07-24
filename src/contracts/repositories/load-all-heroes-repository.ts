import { HeroModel } from './hero-model'

export interface ILoadAllHeroesRepository {
  loadAll: () => Promise<ILoadAllHeroesRepository.Result>
}

export namespace ILoadAllHeroesRepository {
  export type Result = HeroModel[]
}
