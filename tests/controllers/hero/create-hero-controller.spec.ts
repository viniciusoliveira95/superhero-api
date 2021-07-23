import { CreateHeroController } from '@/controllers/hero'
import { ICreateHero } from '@/contracts/services'
import { ServerError, PropertyInUseError, ParamError } from '@/errors'
import { badRequest, forbidden, noContent, serverError } from '@/controllers/http-helper'
import { IHeroRequestValidation } from 'contracts/validations'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateHero Controller', () => {
  let sut: CreateHeroController
  let createHeroService: MockProxy<ICreateHero>
  let heroRequestValidation: MockProxy<IHeroRequestValidation>
  const params: CreateHeroController.Request = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }
  const serviceResponse: ICreateHero.Result = {
    created: false,
    nameAlreadyUsed: false,
    rankAlreadyUsed: false
  }

  beforeEach(() => {
    createHeroService = mock()
    heroRequestValidation = mock()
    sut = new CreateHeroController(createHeroService, heroRequestValidation)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(createHeroService.execute).toBeCalledWith(params)
  })

  it('Should return 204 if created is true', async () => {
    createHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, created: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 500 if service execute throws', async () => {
    createHeroService.execute.mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if nameAlreadyUsed is true', async () => {
    createHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, nameAlreadyUsed: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new PropertyInUseError(['name'])))
  })

  it('Should return 403 if ranklAlreadyUsed is true', async () => {
    createHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, rankAlreadyUsed: true })
    const httpResponse = await sut.handle(params)
    expect(httpResponse).toEqual(forbidden(new PropertyInUseError(['rank'])))
  })

  it('Should return 403 if nameAlreadyUsed and ranklAlreadyUsed is true', async () => {
    createHeroService.execute.mockResolvedValueOnce({ ...serviceResponse, nameAlreadyUsed: true, rankAlreadyUsed: true })
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
