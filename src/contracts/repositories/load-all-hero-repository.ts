import { HeroModel } from './hero-model'

export interface ILoadAllHeroRepository {
  loadAll: () => Promise<ILoadAllHeroRepository.Result>
}

export namespace ILoadAllHeroRepository {
  export type Result = HeroModel[]
}
