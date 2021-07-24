import { IController } from '@/contracts/controllers'
import { LoadAllHeroesController } from '@/controllers/hero'
import { HeroRepository } from '@/repositories'
import { LoadAllHeroesService } from '@/services'

export const makeLoadAllHeroesController = (): IController => {
  const heroRepository = new HeroRepository()
  const loadAllHeoresService = new LoadAllHeroesService(heroRepository)
  return new LoadAllHeroesController(loadAllHeoresService)
}
