import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ICreatePowerstats } from '@/contracts/services/powerstats'
import { IPowerstatsRequestValidation } from '@/contracts/validations'
import { HeroNotExistsError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '../http-helper'

export class CreatePowerStatsController implements IController {
  constructor (
    private readonly createPowerstatsService: ICreatePowerstats,
    private readonly powerStatsRequestValidation: IPowerstatsRequestValidation
  ) {}

  async handle (request: CreatePowerStatsController.Request): Promise<HttpResponse> {
    try {
      const requestValidationError = this.powerStatsRequestValidation.validate(request)
      if (requestValidationError) {
        return badRequest(requestValidationError)
      }
      const response = await this.createPowerstatsService.execute(request)
      if (!response.heroExists) {
        return forbidden(new HeroNotExistsError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreatePowerStatsController {
  export type Request = {
    heroId: string
    name: string
    value: number
  }
}
