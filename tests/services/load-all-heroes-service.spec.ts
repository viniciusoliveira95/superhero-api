import { throwError } from '@/tests/test-helpers'
import { ILoadAllHeroesRepository } from '@/contracts/repositories'
import { LoadAllHeroesService } from '@/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAllHeroesService', () => {
  let loadAllHeroesRepository: MockProxy<ILoadAllHeroesRepository>
  let sut: LoadAllHeroesService

  beforeEach(() => {
    loadAllHeroesRepository = mock()
    sut = new LoadAllHeroesService(loadAllHeroesRepository)
  })

  it('Should call createHeroRepository with correct values', async () => {
    await sut.execute()
    expect(loadAllHeroesRepository.loadAll).toHaveBeenCalledTimes(1)
  })

  it('Should throw if createHeroRepository throws', async () => {
    loadAllHeroesRepository.loadAll.mockRejectedValueOnce(throwError)
    const promise = sut.execute()
    await expect(promise).rejects.toThrow()
  })
})
