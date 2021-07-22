export interface ICheckHeroByNameRepository {
  checkByName: (name: ICheckHeroByNameRepository.Params) => Promise<ICheckHeroByNameRepository.Result>
}

export namespace ICheckHeroByNameRepository {
  export type Params = string
  export type Result = boolean
}
