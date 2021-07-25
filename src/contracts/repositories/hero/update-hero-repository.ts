export interface IUpdateHeroRepository {
  update: (heroData: IUpdateHeroRepository.Params) => Promise<IUpdateHeroRepository.Result>
}

export namespace IUpdateHeroRepository {
  export type Params = {
    heroId: string
    name: string
    description: string
    rank: number
    active: boolean
  }
  export type Result = boolean
}
