export interface IDeleteHeroById {
  execute: (id: string) => Promise<IDeleteHeroById.Result>
}

export namespace IDeleteHeroById {
  export type Result = boolean
}
