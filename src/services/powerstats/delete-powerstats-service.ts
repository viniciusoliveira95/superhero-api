import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { IDeletePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { IDeletePowerstats } from '@/contracts/services/powerstats'

export class DeletePowerstatsService implements IDeletePowerstats {
  constructor (
    private readonly deletePowerstatsRepository: IDeletePowerstatsRepository,
    private readonly checkHeroByIdRepository: ICheckHeroByIdRepository
  ) {}

  async execute (heroParam: IDeletePowerstats.Params): Promise<IDeletePowerstats.Result> {
    const result: IDeletePowerstats.Result = {
      heroExists: false,
      deleted: false
    }
    result.heroExists = await this.checkHeroByIdRepository.checkById(heroParam.heroId)
    if (result.heroExists) {
      result.deleted = await this.deletePowerstatsRepository.delete({
        powerstatsId: heroParam.powerstatsId,
        heroId: heroParam.heroId
      })
    }
    return result
  }
}
