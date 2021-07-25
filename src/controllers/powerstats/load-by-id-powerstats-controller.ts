import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadByIdPowerstats } from '@/contracts/services/powerstats'
import { HeroNotExistsError } from '@/errors'
import { forbidden, serverError, ok, noContent } from '../http-helper'

export class LoadByIdPowerStatsController implements IController {
  constructor (
    private readonly loadByIdPowerstatsService: ILoadByIdPowerstats
  ) {}

  async handle (request: LoadByIdPowerStatsController.Request): Promise<HttpResponse> {
    try {
      const response = await this.loadByIdPowerstatsService.execute(request)
      if (!response.heroExists) {
        return forbidden(new HeroNotExistsError())
      }
      if (response.powerstats) {
        return ok(response.powerstats)
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadByIdPowerStatsController {
  export type Request = {
    powerstatsId: string
    heroId: string
  }
}
