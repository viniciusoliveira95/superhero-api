export interface ICheckByNameAndDiferentIdRepository {
  checkByNameAndDiferentId: (data: ICheckByNameAndDiferentIdRepository.Params) => Promise<ICheckByNameAndDiferentIdRepository.Result>
}

export namespace ICheckByNameAndDiferentIdRepository {
  export type Params = {
    id: string
    name: string
  }
  export type Result = boolean
}
