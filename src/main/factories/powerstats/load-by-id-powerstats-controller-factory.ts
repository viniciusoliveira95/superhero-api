import { IController } from '@/contracts/controllers'
import { LoadByIdPowerStatsController } from '@/controllers/powerstats'
import { HeroRepository, PowerstatsRepository } from '@/repositories'
import { LoadByIdPowerstatsService } from '@/services/powerstats'

export const makeLoadByIdPowerstatsController = (): IController => {
  const powerstatsRepository = new PowerstatsRepository()
  const heroRepository = new HeroRepository()
  const loadByIdPowerStatsService = new LoadByIdPowerstatsService(powerstatsRepository, heroRepository)
  return new LoadByIdPowerStatsController(loadByIdPowerStatsService)
}
