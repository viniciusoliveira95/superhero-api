export interface ICheckByRankAndDiferentIdRepository {
  checkByRankAndDiferentId: (data: ICheckByRankAndDiferentIdRepository.Params) => Promise<ICheckByRankAndDiferentIdRepository.Result>
}

export namespace ICheckByRankAndDiferentIdRepository {
  export type Params = {
    id: string
    rank: number
  }
  export type Result = boolean
}
