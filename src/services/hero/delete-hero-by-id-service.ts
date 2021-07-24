import { IDeleteHeroByIdRepository } from '@/contracts/repositories/hero'
import { IDeleteHeroById } from '@/contracts/services/hero'

export class DeleteHeroByIdService implements IDeleteHeroById {
  constructor (
    private readonly deleteHeroByIdRepository: IDeleteHeroByIdRepository
  ) {}

  async execute (id: string): Promise<IDeleteHeroById.Result> {
    return await this.deleteHeroByIdRepository.deleteById(id)
  }
}
