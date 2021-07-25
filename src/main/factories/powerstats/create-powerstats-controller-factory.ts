import { IController } from '@/contracts/controllers'
import { CreatePowerStatsController } from '@/controllers/powerstats'
import { HeroRepository, PowerstatsRepository } from '@/repositories'
import { CreatePowerstatsService } from '@/services/powerstats'
import { PowerStatsRequestValidation } from '@/validations'

export const makeCreatePowerstatsController = (): IController => {
  const powerstatsRepository = new PowerstatsRepository()
  const heroRepository = new HeroRepository()
  const createPowerStatsService = new CreatePowerstatsService(powerstatsRepository, heroRepository)
  const powerstatsRequestValidation = new PowerStatsRequestValidation()
  return new CreatePowerStatsController(createPowerStatsService, powerstatsRequestValidation)
}
