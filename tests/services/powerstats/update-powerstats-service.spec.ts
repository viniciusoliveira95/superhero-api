import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { IUpdatePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { IUpdatePowerstats } from 'contracts/services/powerstats'
import { UpdatePowerstatsService } from '@/services/powerstats'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdatePowerstatsService', () => {
  let updatePowerstatsRepository: MockProxy<IUpdatePowerstatsRepository>
  let checkHeroByIdRepository: MockProxy<ICheckHeroByIdRepository>
  let sut: UpdatePowerstatsService
  const powerstatsParam: IUpdatePowerstats.Params = {
    powerstatsId: 'any_id',
    heroId: 'any_heroId',
    name: 'any_name',
    value: 1
  }

  beforeEach(() => {
    updatePowerstatsRepository = mock()
    checkHeroByIdRepository = mock()
    sut = new UpdatePowerstatsService(updatePowerstatsRepository, checkHeroByIdRepository)
  })

  it('Should throw if updatePowerstatsRepository throws', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    updatePowerstatsRepository.update.mockRejectedValueOnce(throwError)
    const promise = sut.execute(powerstatsParam)
    await expect(promise).rejects.toThrow()
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

  it('Should call updatePowerstatsRepository when checkHeroByIdRepository returns true', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    await sut.execute(powerstatsParam)
    expect(updatePowerstatsRepository.update).toHaveBeenCalledTimes(1)
    expect(updatePowerstatsRepository.update).toHaveBeenCalledWith(powerstatsParam)
  })

  it('Should not call createHeroRepository when checkHeroByIdRepository returns false', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(false)
    await sut.execute(powerstatsParam)
    expect(updatePowerstatsRepository.update).toHaveBeenCalledTimes(0)
  })
})
