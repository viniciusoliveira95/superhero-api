import { ServerError, HeroNotExistsError, ParamError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '@/controllers/http-helper'
import { IPowerstatsRequestValidation } from 'contracts/validations'
import { ICreatePowerstats } from '@/contracts/services/powerstats'
import { CreatePowerStatsController } from '@/controllers/powerstats'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreatePowerstats Controller', () => {
  let sut: CreatePowerStatsController
  let createPowerstatsService: MockProxy<ICreatePowerstats>
  let powerstatsRequestValidation: MockProxy<IPowerstatsRequestValidation>
  const params: CreatePowerStatsController.Request = {
    heroId: 'any_id',
    name: 'any_name',
    value: 10
  }

  beforeEach(() => {
    createPowerstatsService = mock()
    powerstatsRequestValidation = mock()
    sut = new CreatePowerStatsController(createPowerstatsService, powerstatsRequestValidation)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(createPowerstatsService.execute).toBeCalledWith(params)
  })

  it('Should return 204 on success', async () => {
    createPowerstatsService.execute.mockResolvedValueOnce({ created: true, heroExists: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if service execute throws', async () => {
    createPowerstatsService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if hero does not exists', async () => {
    createPowerstatsService.execute.mockResolvedValueOnce({ heroExists: false, created: false })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new HeroNotExistsError()))
  })

  it('Should return 400 if validation returns an error', async () => {
    powerstatsRequestValidation.validate.mockReturnValueOnce(new ParamError(['any_field']))
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(badRequest(new ParamError(['any_field'])))
  })
})
