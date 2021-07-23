import { CreateHeroController } from '@/controllers/hero'
import { ICreateHero } from '@/contracts/services'
import { ServerError, PropertyInUseError } from '@/errors'
import { forbidden, serverError } from '@/controllers/http-helper'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateHero Controller', () => {
  let sut: CreateHeroController
  let createHeroService: MockProxy<ICreateHero>
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
    sut = new CreateHeroController(createHeroService)
  })

  it('Should call service execute with correct values', async () => {
    await sut.handle(params)
    expect(createHeroService.execute).toBeCalledWith(params)
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
})
