import { CreateHeroController } from '@/controllers/hero'
import { ICreateHero } from '@/contracts/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateHero Controller', () => {
  let sut: CreateHeroController
  let createHeroService: MockProxy<ICreateHero>
  const params = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }

  beforeEach(() => {
    createHeroService = mock()
    sut = new CreateHeroController(createHeroService)
  })

  it('Should call service with correct values', async () => {
    await sut.handle(params)
    expect(createHeroService.execute).toBeCalledWith(params)
  })
})
