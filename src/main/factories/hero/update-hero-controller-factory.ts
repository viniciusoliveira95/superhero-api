import { IController } from '@/contracts/controllers'
import { UpdateHeroController } from '@/controllers/hero'
import { HeroRepository } from '@/repositories'
import { UpdateHeroService } from '@/services/hero'
import { HeroRequestValidation } from '@/validations'

export const makeUpdateHeroController = (): IController => {
  const heroRepository = new HeroRepository()
  const updateHeroService = new UpdateHeroService(heroRepository, heroRepository, heroRepository)
  const heroRequestValidation = new HeroRequestValidation()
  return new UpdateHeroController(updateHeroService, heroRequestValidation)
}
