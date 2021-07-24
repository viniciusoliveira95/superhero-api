import { IController } from '@/contracts/controllers'
import { LoadHeroByIdController } from '@/controllers/hero'
import { HeroRepository } from '@/repositories'
import { LoadHeroByIdService } from '@/services/hero'

export const makeLoadHeroByIdController = (): IController => {
  const heroRepository = new HeroRepository()
  const loadAllHeoresService = new LoadHeroByIdService(heroRepository)
  return new LoadHeroByIdController(loadAllHeoresService)
}
