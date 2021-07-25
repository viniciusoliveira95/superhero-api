import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { IUpdatePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { IUpdatePowerstats } from '@/contracts/services/powerstats'

export class UpdatePowerstatsService implements IUpdatePowerstats {
  constructor (
    private readonly updatePowerstatsRepository: IUpdatePowerstatsRepository,
    private readonly checkHeroByIdRepository: ICheckHeroByIdRepository
  ) {}

  async execute (heroParam: IUpdatePowerstats.Params): Promise<IUpdatePowerstats.Result> {
    const result: IUpdatePowerstats.Result = {
      updated: false,
      heroExists: false
    }
    result.heroExists = await this.checkHeroByIdRepository.checkById(heroParam.heroId)
    if (result.heroExists) {
      result.updated = await this.updatePowerstatsRepository.update(heroParam)
    }
    return result
  }
}
