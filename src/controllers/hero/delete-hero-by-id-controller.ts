import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { IDeleteHeroById } from '@/contracts/services/hero'
import { ParamError } from '@/errors'
import { forbidden, noContent, serverError } from '../http-helper'

export class DeleteHeroByIdController implements IController {
  constructor (private readonly deleteHeroByIdService: IDeleteHeroById) {}

  async handle (request: DeleteHeroByIdController.Request): Promise<HttpResponse> {
    try {
      const isDeleted = await this.deleteHeroByIdService.execute(request.heroId)
      if (isDeleted) {
        return noContent()
      } else {
        return forbidden(new ParamError(['heroId']))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteHeroByIdController {
  export type Request = {
    heroId: string
  }
}
