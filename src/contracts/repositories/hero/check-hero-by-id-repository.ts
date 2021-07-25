export interface ICheckHeroByIdRepository {
  checkById: (id: ICheckHeroByIdRepository.Params) => Promise<ICheckHeroByIdRepository.Result>
}

export namespace ICheckHeroByIdRepository {
  export type Params = string
  export type Result = boolean
}
