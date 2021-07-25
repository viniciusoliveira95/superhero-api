import { IController } from '@/contracts/controllers'
import { LoadAllPowerStatsController } from '@/controllers/powerstats'
import { HeroRepository, PowerstatsRepository } from '@/repositories'
import { LoadAllPowerstatsService } from '@/services/powerstats'

export const makeLoadAllPowerstatsController = (): IController => {
  const powerstatsRepository = new PowerstatsRepository()
  const heroRepository = new HeroRepository()
  const loadAllPowerStatsService = new LoadAllPowerstatsService(powerstatsRepository, heroRepository)
  return new LoadAllPowerStatsController(loadAllPowerStatsService)
}
