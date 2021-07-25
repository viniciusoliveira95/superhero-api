import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ICreatePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { ICreatePowerstats } from '@/contracts/services/powerstats'

export class CreatePowerstatsService implements ICreatePowerstats {
  constructor (
    private readonly createPowerstatsRepository: ICreatePowerstatsRepository,
    private readonly checkHeroByIdRepository: ICheckHeroByIdRepository
  ) {}

  async execute (heroParam: ICreatePowerstats.Params): Promise<ICreatePowerstats.Result> {
    const result: ICreatePowerstats.Result = {
      created: false,
      heroExists: false
    }
    result.heroExists = await this.checkHeroByIdRepository.checkById(heroParam.heroId)
    if (result.heroExists) {
      result.created = await this.createPowerstatsRepository.create(heroParam)
    }
    return result
  }
}
