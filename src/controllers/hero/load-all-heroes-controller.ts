import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ILoadAllHeores } from '@/contracts/services/hero'
import { noContent, ok, serverError } from '../http-helper'

export class LoadAllHeroesController implements IController {
  constructor (private readonly loadAllHeroesService: ILoadAllHeores) {}

  async handle (): Promise<HttpResponse> {
    try {
      const heroes = await this.loadAllHeroesService.execute()
      return heroes?.length ? ok(heroes) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
