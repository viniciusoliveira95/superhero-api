import { ICreateHero } from '@/contracts/services'

export class CreateHeroController {
  constructor (
    private readonly createHeroService: ICreateHero
  ) {}

  async handle (params: any): Promise<void> {
    await this.createHeroService.execute(params)
  }
}
