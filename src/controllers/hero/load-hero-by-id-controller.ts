import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadHeroById } from '@/contracts/services'
import { ParamError } from '@/errors'
import { forbidden, ok, serverError } from '../http-helper'

export class LoadHeroByIdController implements IController {
  constructor (private readonly loadByIdHeroService: ILoadHeroById) {}

  async handle (request: LoadHeroByIdController.Request): Promise<HttpResponse> {
    try {
      const hero = await this.loadByIdHeroService.execute(request.heroId)
      if (!hero) {
        return forbidden(new ParamError(['heroId']))
      }
      return ok(hero)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadHeroByIdController {
  export type Request = {
    heroId: string
  }
}
