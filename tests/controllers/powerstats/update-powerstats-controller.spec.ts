import { ServerError, HeroNotExistsError, ParamError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '@/controllers/http-helper'
import { IPowerstatsRequestValidation } from 'contracts/validations'
import { IUpdatePowerstats } from '@/contracts/services/powerstats'
import { UpdatePowerStatsController } from '@/controllers/powerstats'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdastePowerstats Controller', () => {
  let sut: UpdatePowerStatsController
  let updatePowerstatsService: MockProxy<IUpdatePowerstats>
  let powerstatsRequestValidation: MockProxy<IPowerstatsRequestValidation>
  const params: UpdatePowerStatsController.Request = {
    powerstatsId: 'any_id',
    heroId: 'any_heroId',
    name: 'any_name',
    value: 10
  }

  beforeEach(() => {
    updatePowerstatsService = mock()
    powerstatsRequestValidation = mock()
    sut = new UpdatePowerStatsController(updatePowerstatsService, powerstatsRequestValidation)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(updatePowerstatsService.execute).toBeCalledWith(params)
  })

  it('Should return 204 on success', async () => {
    updatePowerstatsService.execute.mockResolvedValueOnce({ updated: true, heroExists: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if service execute throws', async () => {
    updatePowerstatsService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if hero does not exists', async () => {
    updatePowerstatsService.execute.mockResolvedValueOnce({ heroExists: false, updated: false })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new HeroNotExistsError()))
  })

  it('Should return 400 if validation returns an error', async () => {
    powerstatsRequestValidation.validate.mockReturnValueOnce(new ParamError(['any_field']))
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(badRequest(new ParamError(['any_field'])))
  })
})
