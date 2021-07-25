export interface IUpdateHero {
  execute: (hero: IUpdateHero.Params) => Promise<IUpdateHero.Result>
}

export namespace IUpdateHero {
  export type Params = {
    heroId: string
    name: string
    description: string
    rank: number
    active: boolean
  }

  export type Result = {
    updated: boolean
    nameAlreadyUsed: boolean
    rankAlreadyUsed: boolean
  }
}
