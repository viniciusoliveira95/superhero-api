import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ILoadAllPowerstatsRepository } from '@/contracts/repositories/powerstats'
import { LoadAllPowerstatsService } from '@/services/powerstats'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAllPowerstatsService', () => {
  let loadAllPowerstatsRepository: MockProxy<ILoadAllPowerstatsRepository>
  let checkHeroByIdRepository: MockProxy<ICheckHeroByIdRepository>
  let sut: LoadAllPowerstatsService
  const powerstatsParam = { heroId: 'any_id' }

  beforeEach(() => {
    loadAllPowerstatsRepository = mock()
    checkHeroByIdRepository = mock()
    sut = new LoadAllPowerstatsService(loadAllPowerstatsRepository, checkHeroByIdRepository)
  })

  it('Should call checkHeroByIdRepository with correct id', async () => {
    await sut.execute(powerstatsParam)
    expect(checkHeroByIdRepository.checkById).toBeCalledWith(powerstatsParam.heroId)
    expect(checkHeroByIdRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('Should throw if checkHeroByIdRepository throws', async () => {
    checkHeroByIdRepository.checkById.mockRejectedValueOnce(throwError)
    const promise = sut.execute(powerstatsParam)
    await expect(promise).rejects.toThrow()
  })

  it('Should call loadAllPowerstatsRepository when checkHeroByIdRepository returns true', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    await sut.execute(powerstatsParam)
    expect(loadAllPowerstatsRepository.loadAll).toHaveBeenCalledTimes(1)
    expect(loadAllPowerstatsRepository.loadAll).toHaveBeenCalledWith(powerstatsParam.heroId)
  })

  it('Should not call loadAllPowerstatsRepository when checkHeroByIdRepository returns false', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(false)
    await sut.execute(powerstatsParam)
    expect(loadAllPowerstatsRepository.loadAll).toHaveBeenCalledTimes(0)
  })
})
