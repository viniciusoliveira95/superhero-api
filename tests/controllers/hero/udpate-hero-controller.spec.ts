import { UpdateHeroController } from '@/controllers/hero'
import { IUpdateHero } from '@/contracts/services/hero'
import { ServerError, PropertyInUseError, ParamError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '@/controllers/http-helper'
import { IHeroRequestValidation } from 'contracts/validations'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateHero Controller', () => {
  let sut: UpdateHeroController
  let updateHeroService: MockProxy<IUpdateHero>
  let heroRequestValidation: MockProxy<IHeroRequestValidation>
  const params: UpdateHeroController.Request = {
    heroId: 'any_id',
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }
  const serviceResponse: IUpdateHero.Result = {
    updated: true,
    nameAlreadyUsed: false,
    rankAlreadyUsed: false
  }

  beforeEach(() => {
    updateHeroService = mock()
    heroRequestValidation = mock()
    sut = new UpdateHeroController(updateHeroService, heroRequestValidation)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(updateHeroService.execute).toBeCalledWith(params)
  })

  it('Should return 204 if update is true', async () => {
    updateHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, updated: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if service execute throws', async () => {
    updateHeroService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if updated is false', async () => {
    updateHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, updated: false })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new ParamError(['heroId'])))
  })

  it('Should return 403 if nameAlreadyUsed is true', async () => {
    updateHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, nameAlreadyUsed: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new PropertyInUseError(['name'])))
  })

  it('Should return 403 if ranklAlreadyUsed is true', async () => {
    updateHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, rankAlreadyUsed: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new PropertyInUseError(['rank'])))
  })

  it('Should return 403 if nameAlreadyUsed and ranklAlreadyUsed is true', async () => {
    updateHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, nameAlreadyUsed: true, rankAlreadyUsed: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new PropertyInUseError(['name', 'rank'])))
  })

  it('Should call heroRequestValidation with correct values', async () => {
    await sut.handle(params)
    expect(heroRequestValidation.validate).toBeCalledWith(params)
  })

  it('Should return 400 if validation returns an error', async () => {
    heroRequestValidation.validate.mockReturnValueOnce(new ParamError(['any_field']))
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(badRequest(new ParamError(['any_field'])))
  })
})
