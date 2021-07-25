import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ILoadAllPowerstatsRepository } from '@/contracts/repositories/powerstats'
import { ILoadAllPowerstats } from '@/contracts/services/powerstats'

export class LoadAllPowerstatsService implements ILoadAllPowerstats {
  constructor (
    private readonly loadAllPowerstatsRepository: ILoadAllPowerstatsRepository,
    private readonly checkHeroByIdRepository: ICheckHeroByIdRepository
  ) {}

  async execute (heroParam: ILoadAllPowerstats.Params): Promise<ILoadAllPowerstats.Result> {
    const result: ILoadAllPowerstats.Result = {
      heroExists: false,
      powerstats: []
    }
    result.heroExists = await this.checkHeroByIdRepository.checkById(heroParam.heroId)
    if (result.heroExists) {
      result.powerstats = await this.loadAllPowerstatsRepository.loadAll(heroParam.heroId)
    }
    return result
  }
}
