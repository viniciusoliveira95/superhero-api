import { IController } from '@/contracts/controllers'
import { DeletePowerStatsController } from '@/controllers/powerstats'
import { HeroRepository, PowerstatsRepository } from '@/repositories'
import { DeletePowerstatsService } from '@/services/powerstats'

export const makeDeletePowerstatsController = (): IController => {
  const powerstatsRepository = new PowerstatsRepository()
  const heroRepository = new HeroRepository()
  const deletePowerStatsService = new DeletePowerstatsService(powerstatsRepository, heroRepository)
  return new DeletePowerStatsController(deletePowerStatsService)
}
