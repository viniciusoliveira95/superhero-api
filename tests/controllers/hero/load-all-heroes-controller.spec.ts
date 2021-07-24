import { LoadAllHeroesController } from '@/controllers/hero'
import { ILoadAllHeores } from '@/contracts/services'
import { ok } from '@/controllers/http-helper'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockHeroesModel } from '../../mocks'

describe('LoadAllHeroes Controller', () => {
  let sut: LoadAllHeroesController
  let loadAllHeroesService: MockProxy<ILoadAllHeores>

  beforeEach(() => {
    loadAllHeroesService = mock()
    sut = new LoadAllHeroesController(loadAllHeroesService)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle()
    expect(loadAllHeroesService.execute).toHaveBeenCalledTimes(1)
  })
  it('Should return 200 on success', async () => {
    loadAllHeroesService.execute.mockResolvedValueOnce(mockHeroesModel())
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(mockHeroesModel()))
  })
})
