import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadHeroById } from '@/contracts/services'
import { ParamError } from '@/errors'
import { forbidden, ok, serverError } from '../http-helper'

export class LoadHeroByIdController implements IController {
  constructor (private readonly loadByIdHeroService: ILoadHeroById) {}

  async handle (id: string): Promise<HttpResponse> {
    try {
      const hero = await this.loadByIdHeroService.execute(id)
      if (!hero) {
        return forbidden(new ParamError(['heroId']))
      }
      return ok(hero)
    } catch (error) {
      return serverError(error)
    }
  }
}
