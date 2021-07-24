export interface IDeleteHeroByIdRepository {
  deleteById: (id: IDeleteHeroByIdRepository.Params) => Promise<IDeleteHeroByIdRepository.Result>
}

export namespace IDeleteHeroByIdRepository {
  export type Params = string
  export type Result = boolean
}
