import { HeroModel } from './hero-model'

export interface ILoadHeroByIdRepository {
  loadById: (id: string) => Promise<ILoadHeroByIdRepository.Result>
}

export namespace ILoadHeroByIdRepository {
  export type Result = HeroModel
}
