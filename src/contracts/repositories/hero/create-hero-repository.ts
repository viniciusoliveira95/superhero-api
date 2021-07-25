export interface ICreateHeroRepository {
  create: (heroData: ICreateHeroRepository.Params) => Promise<ICreateHeroRepository.Result>
}

export namespace ICreateHeroRepository {
  export type Params = {
    name: string
    description: string
    rank: number
    active: boolean
  }
  export type Result = boolean
}
