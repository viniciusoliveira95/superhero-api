import { ICreateHeroRepository } from '@/contracts/repositories'
import { ICreateHero } from '@/contracts/services'
import { CreateHeroService } from '@/services/create-hero-service'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateHeroService', () => {
  let createHeroRepository: MockProxy<ICreateHeroRepository>
  let sut: CreateHeroService
  const hero: ICreateHero.Params = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }

  beforeEach(() => {
    createHeroRepository = mock()
    sut = new CreateHeroService(createHeroRepository)
  })

  it('Should call createHeroRepository with correct values', async () => {
    await sut.execute(hero)
    expect(createHeroRepository.create).toBeCalledWith(hero)
    expect(createHeroRepository.create).toHaveBeenCalledTimes(1)
  })
})
