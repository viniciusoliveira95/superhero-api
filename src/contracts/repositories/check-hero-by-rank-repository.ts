export interface ICheckHeroByRankRepository {
  checkByRank: (rank: number) => Promise<ICheckHeroByRankRepository.Result>
}

export namespace ICheckHeroByRankRepository {
  export type Result = boolean
}
