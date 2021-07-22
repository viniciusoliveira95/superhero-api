import { ICheckHeroByNameRepository, ICheckHeroByRankRepository, ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services/create-hero'

export class CreateHeroService implements ICreateHero {
  constructor (
    private readonly createHeroRepository: ICreateHeroRepository,
    private readonly checkHeroByNameRepository: ICheckHeroByNameRepository,
    private readonly checkHeroByRankRepository: ICheckHeroByRankRepository
  ) {}

  async execute (heroParam: ICreateHero.Params): Promise<ICreateHero.Result> {
    const result: ICreateHero.Result = {
      created: false,
      nameAlreadyUsed: false,
      rankAlreadyUsed: false
    }
    result.nameAlreadyUsed = await this.checkHeroByNameRepository.checkByName(heroParam.name)
    result.rankAlreadyUsed = await this.checkHeroByRankRepository.checkByRank(heroParam.rank)
    if (!result.nameAlreadyUsed || !result.rankAlreadyUsed) {
      result.created = await this.createHeroRepository.create(heroParam)
    }
    return result
  }
}
