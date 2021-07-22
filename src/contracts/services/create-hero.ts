export interface ICreateHero {
  execute: (hero: ICreateHero.Params) => Promise<ICreateHero.Result>
}

export namespace ICreateHero {
  export type Params = {
    name: string
    description: string
    rank: number
    active: boolean
  }

  export type Result = {
    created: boolean
    nameAlreadyUsed: boolean
    rankAlreadyUsed: boolean
  }
}
