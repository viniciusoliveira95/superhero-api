import { ServerError, HeroNotExistsError } from '@/errors'
import { forbidden, ok, serverError } from '@/controllers/http-helper'
import { ILoadByIdPowerstats } from '@/contracts/services/powerstats'
import { LoadByIdPowerStatsController } from '@/controllers/powerstats'
import { mockPowerstatsModel } from '@/tests/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadByIdPowerstats Controller', () => {
  let loadByIdPowerstatsService: MockProxy<ILoadByIdPowerstats>
  let sut: LoadByIdPowerStatsController
  const params: LoadByIdPowerStatsController.Request = {
    powerstatsId: 'any_id',
    heroId: 'any_heroId'
  }

  beforeEach(() => {
    loadByIdPowerstatsService = mock()
    sut = new LoadByIdPowerStatsController(loadByIdPowerstatsService)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(loadByIdPowerstatsService.execute).toBeCalledWith(params)
  })

  it('Should return 200 on success', async () => {
    loadByIdPowerstatsService.execute.mockResolvedValueOnce({ powerstats: mockPowerstatsModel(), heroExists: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(ok(mockPowerstatsModel()))
  })

  it('Should return 500 if service execute throws', async () => {
    loadByIdPowerstatsService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if hero does not exists', async () => {
    loadByIdPowerstatsService.execute.mockResolvedValueOnce({ heroExists: false, powerstats: null })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new HeroNotExistsError()))
  })
})
