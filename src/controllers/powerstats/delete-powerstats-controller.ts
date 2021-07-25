import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { IDeletePowerstats } from '@/contracts/services/powerstats'
import { HeroNotExistsError } from '@/errors'
import { forbidden, serverError, noContent } from '../http-helper'

export class DeletePowerStatsController implements IController {
  constructor (
    private readonly deletePowerstatsService: IDeletePowerstats
  ) {}

  async handle (request: DeletePowerStatsController.Request): Promise<HttpResponse> {
    try {
      const response = await this.deletePowerstatsService.execute(request)
      if (!response.heroExists) {
        return forbidden(new HeroNotExistsError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeletePowerStatsController {
  export type Request = {
    powerstatsId: string
    heroId: string
  }
}
