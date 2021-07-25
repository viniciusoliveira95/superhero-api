import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { IDeletePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { DeletePowerstatsService } from '@/services/powerstats'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeletePowerstatsService', () => {
  let deletePowerstatsRepository: MockProxy<IDeletePowerstatsRepository>
  let checkHeroByIdRepository: MockProxy<ICheckHeroByIdRepository>
  let sut: DeletePowerstatsService
  const powerstatsParam = { powerstatsId: 'any_id', heroId: 'any_heroId' }

  beforeEach(() => {
    deletePowerstatsRepository = mock()
    checkHeroByIdRepository = mock()
    sut = new DeletePowerstatsService(deletePowerstatsRepository, checkHeroByIdRepository)
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

  it('Should call deletePowerstatsRepository when checkHeroByIdRepository returns true', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    await sut.execute(powerstatsParam)
    expect(deletePowerstatsRepository.delete).toHaveBeenCalledTimes(1)
    expect(deletePowerstatsRepository.delete).toHaveBeenCalledWith(powerstatsParam)
  })

  it('Should not call loadByIdPowerstatsRepository when checkHeroByIdRepository returns false', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(false)
    await sut.execute(powerstatsParam)
    expect(deletePowerstatsRepository.delete).toHaveBeenCalledTimes(0)
  })
})
