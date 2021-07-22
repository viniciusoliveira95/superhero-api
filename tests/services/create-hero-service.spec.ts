import { ICheckHeroByNameRepository, ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services'
import { CreateHeroService } from '@/services/create-hero-service'
import { mock, MockProxy } from 'jest-mock-extended'
import { throwError } from '../helpers'

describe('CreateHeroService', () => {
  let createHeroRepository: MockProxy<ICreateHeroRepository>
  let checkHeroByNameRepository: MockProxy<ICheckHeroByNameRepository>
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
    sut = new CreateHeroService(createHeroRepository, checkHeroByNameRepository)
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
})
