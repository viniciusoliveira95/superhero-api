import { ServerError, HeroNotExistsError } from '@/errors'
import { forbidden, ok, serverError } from '@/controllers/http-helper'
import { ILoadAllPowerstats } from '@/contracts/services/powerstats'
import { LoadAllPowerStatsController } from '@/controllers/powerstats'
import { mockPowerstatsListModel } from '@/tests/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadAllPowerstats Controller', () => {
  let loadAllPowerstatsService: MockProxy<ILoadAllPowerstats>
  let sut: LoadAllPowerStatsController
  const params: LoadAllPowerStatsController.Request = {
    heroId: 'any_id'
  }

  beforeEach(() => {
    loadAllPowerstatsService = mock()
    sut = new LoadAllPowerStatsController(loadAllPowerstatsService)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(loadAllPowerstatsService.execute).toBeCalledWith(params)
  })

  it('Should return 200 on success', async () => {
    loadAllPowerstatsService.execute.mockResolvedValueOnce({ powerstats: mockPowerstatsListModel(), heroExists: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(ok(mockPowerstatsListModel()))
  })

  it('Should return 500 if service execute throws', async () => {
    loadAllPowerstatsService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if hero does not exists', async () => {
    loadAllPowerstatsService.execute.mockResolvedValueOnce({ heroExists: false, powerstats: [] })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new HeroNotExistsError()))
  })
})
