import { ICheckHeroByNameRepository, ICheckHeroByRankRepository, ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services'
import { CreateHeroService } from '@/services'
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
    createHeroRepository.create.mockResolvedValue(false)
    checkHeroByNameRepository.checkByName.mockResolvedValue(false)
    checkHeroByRankRepository.checkByRank.mockResolvedValue(false)
  })

  it('Should call createHeroRepository with correct values', async () => {
    await sut.execute(hero)
    expect(createHeroRepository.create).toBeCalledWith(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(1)
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

  it('Should result.created return true if name and rank is not used', async () => {
    createHeroRepository.create.mockResolvedValueOnce(true)
    const result = await sut.execute(hero)
    expect(result.created).toBe(true)
    expect(result.nameAlreadyUsed).toBe(false)
    expect(result.rankAlreadyUsed).toBe(false)
  })

  it('Should result.created return false if name is used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(true)
    const result = await sut.execute(hero)
    expect(result.created).toBe(false)
    expect(result.nameAlreadyUsed).toBe(true)
    expect(result.rankAlreadyUsed).toBe(false)
  })

  it('Should result.created return false if rank is used', async () => {
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(true)
    const result = await sut.execute(hero)
    expect(result.created).toBe(false)
    expect(result.nameAlreadyUsed).toBe(false)
    expect(result.rankAlreadyUsed).toBe(true)
  })

  it('Should result.created return false if name and rank is used', async () => {
    checkHeroByNameRepository.checkByName.mockResolvedValueOnce(true)
    checkHeroByRankRepository.checkByRank.mockResolvedValueOnce(true)
    const result = await sut.execute(hero)
    expect(result.created).toBe(false)
    expect(result.nameAlreadyUsed).toBe(true)
    expect(result.rankAlreadyUsed).toBe(true)
  })
})
