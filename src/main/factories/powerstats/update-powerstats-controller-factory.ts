import { IController } from '@/contracts/controllers'
import { UpdatePowerStatsController } from '@/controllers/powerstats'
import { HeroRepository, PowerstatsRepository } from '@/repositories'
import { UpdatePowerstatsService } from '@/services/powerstats'
import { PowerStatsRequestValidation } from '@/validations'

export const makeUpdatePowerstatsController = (): IController => {
  const powerstatsRepository = new PowerstatsRepository()
  const heroRepository = new HeroRepository()
  const updatePowerStatsService = new UpdatePowerstatsService(powerstatsRepository, heroRepository)
  const powerstatsRequestValidation = new PowerStatsRequestValidation()
  return new UpdatePowerStatsController(updatePowerStatsService, powerstatsRequestValidation)
}
