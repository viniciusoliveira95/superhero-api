import { ICreateHero } from '@/contracts/services'

export interface ICreateHeroRepository {
  create: (accountData: ICreateHeroRepository.Params) => Promise<ICreateHeroRepository.Result>
}

export namespace ICreateHeroRepository {
  export type Params = ICreateHero.Params
  export type Result = boolean
}
