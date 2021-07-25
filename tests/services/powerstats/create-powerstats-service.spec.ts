import { ICheckHeroByIdRepository } from '@/contracts/repositories/hero'
import { ICreatePowerstatsRepository } from '@/contracts/repositories/powerstats'
import { ICreatePowerstats } from 'contracts/services/powerstats'
import { CreatePowerstatsService } from '@/services/powerstats'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreatePowerstatsService', () => {
  let createPowerstatsRepository: MockProxy<ICreatePowerstatsRepository>
  let checkHeroByIdRepository: MockProxy<ICheckHeroByIdRepository>
  let sut: CreatePowerstatsService
  const powerstatsParam: ICreatePowerstats.Params = {
    heroId: 'any_id',
    name: 'any_name',
    value: 1
  }

  beforeEach(() => {
    createPowerstatsRepository = mock()
    checkHeroByIdRepository = mock()
    sut = new CreatePowerstatsService(createPowerstatsRepository, checkHeroByIdRepository)
  })

  it('Should throw if createPowerstatsRepository throws', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    createPowerstatsRepository.create.mockRejectedValueOnce(throwError)
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

  it('Should call createPowerstatsRepository when checkHeroByIdRepository returns true', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(true)
    await sut.execute(powerstatsParam)
    expect(createPowerstatsRepository.create).toHaveBeenCalledTimes(1)
    expect(createPowerstatsRepository.create).toHaveBeenCalledWith(powerstatsParam)
  })

  it('Should not call createHeroRepository checkHeroByIdRepository returns false', async () => {
    checkHeroByIdRepository.checkById.mockResolvedValueOnce(false)
    await sut.execute(powerstatsParam)
    expect(createPowerstatsRepository.create).toHaveBeenCalledTimes(0)
  })
})
