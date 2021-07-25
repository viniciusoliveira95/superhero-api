import { ICheckByNameAndDiferentIdRepository, ICheckByRankAndDiferentIdRepository, IUpdateHeroRepository } from '@/contracts/repositories/hero'
import { IUpdateHero } from '@/contracts/services/hero'
import { UpdateHeroService } from '@/services/hero'
import { throwError } from '@/../tests/test-helpers'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateHeroService', () => {
  let updateHeroRepository: MockProxy<IUpdateHeroRepository>
  let checkByNameAndDiferentIdRepository: MockProxy<ICheckByNameAndDiferentIdRepository>
  let checkByRankAndDiferentIdRepository: MockProxy<ICheckByRankAndDiferentIdRepository>
  let sut: UpdateHeroService
  const hero: IUpdateHero.Params = {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }

  beforeEach(() => {
    updateHeroRepository = mock()
    checkByNameAndDiferentIdRepository = mock()
    checkByRankAndDiferentIdRepository = mock()
    sut = new UpdateHeroService(updateHeroRepository, checkByNameAndDiferentIdRepository, checkByRankAndDiferentIdRepository)
    updateHeroRepository.update.mockResolvedValue(false)
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockResolvedValue(false)
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockResolvedValue(false)
  })

  it('Should call updateHeroRepository with correct values', async () => {
    await sut.execute(hero)
    expect(updateHeroRepository.update).toBeCalledWith(hero)
    expect(updateHeroRepository.update).toHaveBeenCalledTimes(1)
  })

  it('Should throw if updateHeroRepository throws', async () => {
    updateHeroRepository.update.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call checkByNameAndDiferentIdRepository with correct name', async () => {
    await sut.execute(hero)
    expect(checkByNameAndDiferentIdRepository.checkByNameAndDiferentId).toHaveBeenCalledTimes(1)
    expect(checkByNameAndDiferentIdRepository.checkByNameAndDiferentId).toBeCalledWith({ id: hero.id, name: hero.name })
  })

  it('Should throw if checkByNameAndDiferentIdRepository throws', async () => {
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call checkByRankAndDiferentIdRepository with correct rank', async () => {
    await sut.execute(hero)
    expect(checkByRankAndDiferentIdRepository.checkByRankAndDiferentId).toBeCalledWith({ id: hero.id, rank: hero.rank })
    expect(checkByRankAndDiferentIdRepository.checkByRankAndDiferentId).toHaveBeenCalledTimes(1)
  })

  it('Should throw if checkByRankAndDiferentIdRepository throws', async () => {
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockRejectedValueOnce(throwError)
    const promise = sut.execute(hero)
    await expect(promise).rejects.toThrow()
  })

  it('Should call updateHeroRepository when name and rank is not been used', async () => {
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockResolvedValueOnce(false)
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockResolvedValueOnce(false)
    await sut.execute(hero)
    expect(updateHeroRepository.update).toHaveBeenCalledTimes(1)
  })

  it('Should not call updateHeroRepository when name and rank is used', async () => {
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockResolvedValueOnce(true)
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockResolvedValueOnce(true)
    await sut.execute(hero)
    expect(updateHeroRepository.update).toHaveBeenCalledTimes(0)
  })

  it('Should not call updateHeroRepository when name is used', async () => {
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockResolvedValueOnce(true)
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockResolvedValueOnce(false)
    await sut.execute(hero)
    expect(updateHeroRepository.update).toHaveBeenCalledTimes(0)
  })

  it('Should not call createHeroRepository when rank is used', async () => {
    checkByNameAndDiferentIdRepository.checkByNameAndDiferentId.mockResolvedValueOnce(false)
    checkByRankAndDiferentIdRepository.checkByRankAndDiferentId.mockResolvedValueOnce(true)
    await sut.execute(hero)
    expect(updateHeroRepository.update).toHaveBeenCalledTimes(0)
  })
})
