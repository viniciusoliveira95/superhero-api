import { throwError } from '@/tests/test-helpers'
import { ILoadAllHeroesRepository } from '@/contracts/repositories'
import { LoadAllHeroesService } from '@/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAllHeroesService', () => {
  let loadAllHeroesRepository: MockProxy<ILoadAllHeroesRepository>
  let sut: LoadAllHeroesService

  beforeEach(() => {
    loadAllHeroesRepository = mock()
    sut = new LoadAllHeroesService(loadAllHeroesRepository)
  })

  it('Should call createHeroRepository with correct values', async () => {
    await sut.execute()
    expect(loadAllHeroesRepository.loadAll).toHaveBeenCalledTimes(1)
  })

  it('Should throw if createHeroRepository throws', async () => {
    loadAllHeroesRepository.loadAll.mockRejectedValueOnce(throwError)
    const promise = sut.execute()
    await expect(promise).rejects.toThrow()
  })

  it('Should return a list of Heroes on success', async () => {
    const heroesModel: ILoadAllHeroesRepository.Result = [
      {
        id: 'any_id',
        name: 'any_name',
        description: 'any_description',
        active: true,
        rank: 1,
        createdAt: new Date(2021, 7, 24),
        updatedAt: new Date(2021, 7, 25),
        powerstats: {
          power: 99,
          intelligence: 60
        }
      },
      {
        id: 'other_id',
        name: 'other_name',
        description: 'other_description',
        active: true,
        rank: 2,
        createdAt: new Date(2021, 6, 23),
        updatedAt: new Date(2021, 6, 24),
        powerstats: {
          power: 99,
          intelligence: 60
        }
      }
    ]
    loadAllHeroesRepository.loadAll.mockResolvedValueOnce(heroesModel)
    const heroes = await sut.execute()
    await expect(heroes).toEqual(heroesModel)
  })
})
