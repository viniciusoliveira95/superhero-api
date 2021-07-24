import { IController } from '@/contracts/controllers'
import { CreateHeroController } from '@/controllers/hero'
import { HeroRepository } from '@/repositories'
import { CreateHeroService } from '@/services/hero'
import { HeroRequestValidation } from '@/validations'

export const makeCreateHeroController = (): IController => {
  const heroRepository = new HeroRepository()
  const createHeroService = new CreateHeroService(heroRepository, heroRepository, heroRepository)
  const heroRequestValidation = new HeroRequestValidation()
  return new CreateHeroController(createHeroService, heroRequestValidation)
}
