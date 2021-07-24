import { ILoadAllHeroesRepository } from '@/contracts/repositories'
import { ILoadAllHeores } from '@/contracts/services'

export class LoadAllHeroesService implements ILoadAllHeores {
  constructor (
    private readonly loadAllHeroRepository: ILoadAllHeroesRepository
  ) {}

  async execute (): Promise<ILoadAllHeores.Result> {
    await this.loadAllHeroRepository.loadAll()
    return null
  }
}
