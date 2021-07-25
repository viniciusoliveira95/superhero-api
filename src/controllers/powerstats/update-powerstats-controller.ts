import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { IUpdatePowerstats } from '@/contracts/services/powerstats'
import { IPowerstatsRequestValidation } from '@/contracts/validations'
import { HeroNotExistsError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '../http-helper'

export class UpdatePowerStatsController implements IController {
  constructor (
    private readonly updatePowerstatsService: IUpdatePowerstats,
    private readonly powerStatsRequestValidation: IPowerstatsRequestValidation
  ) {}

  async handle (request: UpdatePowerStatsController.Request): Promise<HttpResponse> {
    try {
      const requestValidationError = this.powerStatsRequestValidation.validate(request)
      if (requestValidationError) {
        return badRequest(requestValidationError)
      }
      const response = await this.updatePowerstatsService.execute(request)
      if (!response.heroExists) {
        return forbidden(new HeroNotExistsError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdatePowerStatsController {
  export type Request = {
    powerstatsId: string
    heroId: string
    name: string
    value: number
  }
}
