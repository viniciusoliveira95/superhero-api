import { HeroModel } from '@/contracts/repositories'

export interface ILoadHeroById{
  execute: (id: string) => Promise<ILoadHeroById.Result>
}

export namespace ILoadHeroById {
  export type Result = HeroModel
}
