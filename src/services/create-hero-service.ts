import { ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services/create-hero'

export class CreateHeroService implements ICreateHero {
  constructor (
    private readonly createHeroRepository: ICreateHeroRepository
  ) {}

  async execute (heroParam: ICreateHero.Params): Promise<boolean> {
    await this.createHeroRepository.create(heroParam)
    return true
  }
}
