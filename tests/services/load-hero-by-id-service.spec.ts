import { throwError } from '@/tests/test-helpers'
import { mockHeroModel } from '@/tests/mocks/mock-hero'
import { ILoadHeroByIdRepository } from '@/contracts/repositories'
import { LoadHeroByIdService } from '@/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadHeroByIdService', () => {
  let loadHeroByIdRepository: MockProxy<ILoadHeroByIdRepository>
  let sut: LoadHeroByIdService

  beforeEach(() => {
    loadHeroByIdRepository = mock()
    sut = new LoadHeroByIdService(loadHeroByIdRepository)
  })

  it('Should call loadHeroByIdRepository with correct value', async () => {
    await sut.execute('any_id')
    expect(loadHeroByIdRepository.loadById).toHaveBeenCalledTimes(1)
    expect(loadHeroByIdRepository.loadById).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if loadHeroByIdRepository throws', async () => {
    loadHeroByIdRepository.loadById.mockRejectedValueOnce(throwError)
    const promise = sut.execute('any_ud')
    await expect(promise).rejects.toThrow()
  })

  it('Should return a hero on success', async () => {
    loadHeroByIdRepository.loadById.mockResolvedValueOnce(mockHeroModel())
    const hero = await sut.execute('any_id')
    expect(hero).toEqual(mockHeroModel())
  })
})
