import { HeroModel } from '@/contracts/models'

export interface ILoadHeroById{
  execute: (id: string) => Promise<ILoadHeroById.Result>
}

export namespace ILoadHeroById {
  export type Result = HeroModel
}
