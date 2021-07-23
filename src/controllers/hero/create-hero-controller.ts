import { IController } from '@/contracts/controllers/controller'
import { HttpResponse } from '@/contracts/http/http'
import { ICreateHero } from '@/contracts/services'

export class CreateHeroController implements IController {
  constructor (
    private readonly createHeroService: ICreateHero
  ) {}

  async handle (request: CreateHeroController.Request): Promise<HttpResponse> {
    await this.createHeroService.execute(request)
    return {
      statusCode: 200,
      body: {}
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
