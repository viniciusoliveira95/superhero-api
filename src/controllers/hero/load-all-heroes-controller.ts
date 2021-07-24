import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadAllHeores } from '@/contracts/services'
import { ok } from '../http-helper'

export class LoadAllHeroesController implements IController {
  constructor (private readonly loadAllHeroesService: ILoadAllHeores) {}

  async handle (): Promise<HttpResponse> {
    const heroes = await this.loadAllHeroesService.execute()
    return ok(heroes)
  }
}

export namespace LoadAllHeroesController {

}
