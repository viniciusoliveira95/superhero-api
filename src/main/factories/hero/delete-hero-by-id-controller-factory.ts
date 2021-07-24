import { IController } from '@/contracts/controllers'
import { DeleteHeroByIdController } from '@/controllers/hero'
import { HeroRepository } from '@/repositories'
import { DeleteHeroByIdService } from '@/services/hero'

export const makeDeleteHeroByIdController = (): IController => {
  const heroRepository = new HeroRepository()
  const deleteHeroByIdService = new DeleteHeroByIdService(heroRepository)
  return new DeleteHeroByIdController(deleteHeroByIdService)
}
