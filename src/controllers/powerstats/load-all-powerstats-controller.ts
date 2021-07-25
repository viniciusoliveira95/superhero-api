import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadAllPowerstats } from '@/contracts/services/powerstats'
import { HeroNotExistsError } from '@/errors'
import { forbidden, serverError, ok } from '../http-helper'

export class LoadAllPowerStatsController implements IController {
  constructor (
    private readonly loadAllPowerstatsService: ILoadAllPowerstats
  ) {}

  async handle (request: LoadAllPowerStatsController.Request): Promise<HttpResponse> {
    try {
      const response = await this.loadAllPowerstatsService.execute(request)
      if (!response.heroExists) {
        return forbidden(new HeroNotExistsError())
      }
      return ok(response.powerstats)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadAllPowerStatsController {
  export type Request = {
    heroId: string
  }
}
