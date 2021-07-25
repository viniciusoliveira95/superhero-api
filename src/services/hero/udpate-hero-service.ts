import { ICheckByNameAndDiferentIdRepository, ICheckByRankAndDiferentIdRepository, IUpdateHeroRepository } from '@/contracts/repositories/hero'
import { IUpdateHero } from '@/contracts/services/hero'

export class UpdateHeroService implements IUpdateHero {
  constructor (
    private readonly updateHeroRepository: IUpdateHeroRepository,
    private readonly checkByNameAndDiferentIdRepository: ICheckByNameAndDiferentIdRepository,
    private readonly checkByRankAndDiferentIdRepository: ICheckByRankAndDiferentIdRepository
  ) {}

  async execute (heroParam: IUpdateHero.Params): Promise<IUpdateHero.Result> {
    const result: IUpdateHero.Result = {
      updated: false,
      nameAlreadyUsed: false,
      rankAlreadyUsed: false
    }
    result.nameAlreadyUsed = await this.checkByNameAndDiferentIdRepository.checkByNameAndDiferentId({
      id: heroParam.id,
      name: heroParam.name
    })
    result.rankAlreadyUsed = await this.checkByRankAndDiferentIdRepository.checkByRankAndDiferentId({
      id: heroParam.id,
      rank: heroParam.rank
    })
    if (!result.nameAlreadyUsed && !result.rankAlreadyUsed) {
      result.updated = await this.updateHeroRepository.update(heroParam)
    }
    return result
  }
}
