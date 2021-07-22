import { ICheckHeroByNameRepository, ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services/create-hero'

export class CreateHeroService implements ICreateHero {
  constructor (
    private readonly createHeroRepository: ICreateHeroRepository,
    private readonly checkHeroByNameRepository: ICheckHeroByNameRepository
  ) {}

  async execute (heroParam: ICreateHero.Params): Promise<boolean> {
    await this.checkHeroByNameRepository.checkByName(heroParam.name)
    await this.createHeroRepository.create(heroParam)
    return true
  }
}
