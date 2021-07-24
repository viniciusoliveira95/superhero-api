import { ILoadHeroByIdRepository } from '@/contracts/repositories/hero'
import { ILoadHeroById } from '@/contracts/services/hero'

export class LoadHeroByIdService implements ILoadHeroById {
  constructor (
    private readonly loadHeroByIdRepository: ILoadHeroByIdRepository
  ) {}

  async execute (id: string): Promise<ILoadHeroById.Result> {
    return await this.loadHeroByIdRepository.loadById(id)
  }
}
