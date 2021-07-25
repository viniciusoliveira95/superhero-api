import { ServerError, HeroNotExistsError } from '@/errors'
import { forbidden, noContent, serverError } from '@/controllers/http-helper'
import { IDeletePowerstats } from '@/contracts/services/powerstats'
import { DeletePowerStatsController } from '@/controllers/powerstats'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeletePowerstats Controller', () => {
  let deletePowerstatsService: MockProxy<IDeletePowerstats>
  let sut: DeletePowerStatsController
  const params: DeletePowerStatsController.Request = {
    powerstatsId: 'any_id',
    heroId: 'any_heroId'
  }

  beforeEach(() => {
    deletePowerstatsService = mock()
    sut = new DeletePowerStatsController(deletePowerstatsService)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(deletePowerstatsService.execute).toBeCalledWith(params)
  })

  it('Should return 204 on success', async () => {
    deletePowerstatsService.execute.mockResolvedValueOnce({ deleted: true, heroExists: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if service execute throws', async () => {
    deletePowerstatsService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if hero does not exists', async () => {
    deletePowerstatsService.execute.mockResolvedValueOnce({ heroExists: false, deleted: false })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new HeroNotExistsError()))
  })
})
