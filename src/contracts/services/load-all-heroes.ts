import { HeroModel } from '@/contracts/repositories'

export interface ILoadAllHeores {
  execute: () => Promise<ILoadAllHeores.Result>
}

export namespace ILoadAllHeores {
  export type Result = HeroModel[]
}
