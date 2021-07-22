export interface ICheckHeroByRankRepository {
  checkByRank: (rank: ICheckHeroByRankRepository.Params) => Promise<ICheckHeroByRankRepository.Result>
}

export namespace ICheckHeroByRankRepository {
  export type Params = number
  export type Result = boolean
}
