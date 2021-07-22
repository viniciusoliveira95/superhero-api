export interface ICheckHeroByNameRepository {
  checkByName: (email: string) => Promise<ICheckHeroByNameRepository.Result>
}

export namespace ICheckHeroByNameRepository {
  export type Result = boolean
}
