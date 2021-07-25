import { ICheckHeroByNameRepository, ICheckHeroByRankRepository, ICreateHeroRepository } from '@/contracts/repositories/hero'
import { ICreateHero } from '@/contracts/services/hero'
import { CreateHeroService } from '@/services/hero'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateHeroService', () => {
  let createHeroRepository: MockProxy<ICreateHeroRepository>
  let checkHeroByNameRepository: MockProxy<ICheckHeroByNameRepository>
  let checkHeroByRankRepository: MockProxy<ICheckHeroByRankRepository>
  let sut: CreateHeroService
  const hero: ICreateHero.Params = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }

  beforeEach(() => {
    createHeroRepository = mock()
    checkHeroByNameRepository = mock()
    checkHeroByRankRepository = mock()
    sut = new CreateHeroService(createHeroRepository, checkHeroByNameRepository, checkHeroByRankRepository)
  })

  it('Should throw if createHeroRepository throws', async () => {
    createHeroRepository.create.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call CheckHeroByNameRepository with correct name', async () => {
    await sut.execute(hero)
    expect(checkHeroByNameRepository.checkByName).toBeCalledWith(hero.name)
    expect(checkHeroByNameRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('Should throw if CheckHeroByNameRepository throws', async () => {
    checkHeroByNameRepository.checkByName.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call CheckHeroByRankRepository with correct rank', async () => {
    await sut.execute(hero)
    expect(checkHeroByRankRepository.checkByRank).toBeCalledWith(hero.rank)
    expect(checkHeroByRankRepository.checkByRank).toHaveBeenCalledTimes(1)
  })

  it('Should throw if CheckHeroByRankRepository throws', async () => {
    checkHeroByRankRepository.checkByRank.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call createHeroRepository when name and rank is not been used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(false)
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(false)
    await sut.execute(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(1)
    expect(createHeroRepository.create).toHaveBeenCalledWith(hero)
  })

  it('Should not call createHeroRepository when name and rank is used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(true)
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(true)
    await sut.execute(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(0)
  })

  it('Should not call createHeroRepository when name is used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(true)
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(false)
    await sut.execute(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(0)
  })

  it('Should not call createHeroRepository when rank is used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(false)
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(true)
    await sut.execute(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(0)
  })
})
