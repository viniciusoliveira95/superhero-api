export interface ICheckHeroByNameRepository {
  checkByName: (name: string) => Promise<ICheckHeroByNameRepository.Result>
}

export namespace ICheckHeroByNameRepository {
  export type Result = boolean
}
