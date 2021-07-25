import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ILoadByIdPowerstatsRepository } from '@/contracts/repositories/powerstats'
import { ILoadByIdPowerstats } from '@/contracts/services/powerstats'

export class LoadByIdPowerstatsService implements ILoadByIdPowerstats {
  constructor (
    private readonly loadByIdPowerstatsRepository: ILoadByIdPowerstatsRepository,
    private readonly checkHeroByIdRepository: ICheckHeroByIdRepository
  ) {}

  async execute (heroParam: ILoadByIdPowerstats.Params): Promise<ILoadByIdPowerstats.Result> {
    const result: ILoadByIdPowerstats.Result = {
      heroExists: false,
      powerstats: null
    }
    result.heroExists = await this.checkHeroByIdRepository.checkById(heroParam.heroId)
    if (result.heroExists) {
      result.powerstats = await this.loadByIdPowerstatsRepository.loadById({
        powerstatsId: heroParam.powerstatsId,
        heroId: heroParam.heroId
      })
    }
    return result
  }
}
