import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ICreateHero } from '@/contracts/services/hero'
import { IHeroRequestValidation } from '@/contracts/validations'
import { PropertyInUseError } from '@/errors/property-in-use-error'
import { badRequest, forbidden, noContent, serverError } from '../http-helper'

export class CreateHeroController implements IController {
  constructor (
    private readonly createHeroService: ICreateHero,
    private readonly heroRequestValidation: IHeroRequestValidation
  ) {}

  async handle (request: CreateHeroController.Request): Promise<HttpResponse> {
    try {
      const requestValidationError = this.heroRequestValidation.validate(request)
      if (requestValidationError) {
        return badRequest(requestValidationError)
      }
      const response = await this.createHeroService.execute(request)
      if (response.nameAlreadyUsed || response.rankAlreadyUsed) {
        const propertiesName: string[] = []
        response.nameAlreadyUsed && propertiesName.push('name')
        response.rankAlreadyUsed && propertiesName.push('rank')
        return forbidden(new PropertyInUseError(propertiesName))
      }
      if (response.created) {
        return noContent()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace CreateHeroController {
  export type Request = {
    name: string
    description: string
    rank: number
    active: boolean
  }
}
