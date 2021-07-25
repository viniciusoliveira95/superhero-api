import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ILoadByIdPowerstatsRepository } from '@/contracts/repositories/powerstats'
import { LoadByIdPowerstatsService } from '@/services/powerstats'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadByIdPowerstatsService', () => {
  let loadByIdPowerstatsRepository: MockProxy<ILoadByIdPowerstatsRepository>
  let checkHeroByIdRepository: MockProxy<ICheckHeroByIdRepository>
  let sut: LoadByIdPowerstatsService
  const powerstatsParam = { powerstatsId: 'any_id', heroId: 'any_heroId' }

  beforeEach(() => {
    loadByIdPowerstatsRepository = mock()
    checkHeroByIdRepository = mock()
    sut = new LoadByIdPowerstatsService(loadByIdPowerstatsRepository, checkHeroByIdRepository)
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

  it('Should call loadByIdPowerstatsRepository when checkHeroByIdRepository returns true', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    await sut.execute(powerstatsParam)
    expect(loadByIdPowerstatsRepository.loadById).toHaveBeenCalledTimes(1)
    expect(loadByIdPowerstatsRepository.loadById).toHaveBeenCalledWith(powerstatsParam)
  })

  it('Should not call loadByIdPowerstatsRepository when checkHeroByIdRepository returns false', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(false)
    await sut.execute(powerstatsParam)
    expect(loadByIdPowerstatsRepository.loadById).toHaveBeenCalledTimes(0)
  })
})
