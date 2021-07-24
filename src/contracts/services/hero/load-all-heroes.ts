import { HeroModel } from '@/contracts/models'

export interface ILoadAllHeores {
  execute: () => Promise<ILoadAllHeores.Result>
}

export namespace ILoadAllHeores {
  export type Result = HeroModel[]
}
