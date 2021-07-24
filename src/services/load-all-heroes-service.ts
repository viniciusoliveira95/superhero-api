import { ILoadAllHeroesRepository } from '@/contracts/repositories/hero'
import { ILoadAllHeores } from '@/contracts/services/hero'

export class LoadAllHeroesService implements ILoadAllHeores {
  constructor (
    private readonly loadAllHeroRepository: ILoadAllHeroesRepository
  ) {}

  async execute (): Promise<ILoadAllHeores.Result> {
    return await this.loadAllHeroRepository.loadAll()
  }
}
