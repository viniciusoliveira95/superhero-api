import { LoadHeroByIdController } from '@/controllers/hero'
import { ILoadHeroById } from '@/contracts/services/hero'
import { forbidden, ok, serverError } from '@/controllers/http-helper'
import { ParamError } from '@/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { mockHeroModel } from '../../mocks'
import { throwError } from '../../test-helpers'

describe('LoadHeroById Controller', () => {
  let sut: LoadHeroByIdController
  let loadHeroByIdService: MockProxy<ILoadHeroById>
  const request: LoadHeroByIdController.Request = {
    heroId: 'any_id'
  }

  beforeEach(() => {
    loadHeroByIdService = mock()
    sut = new LoadHeroByIdController(loadHeroByIdService)
  })

  it('Should call service execute with correct value', async () => {
    await sut.handle(request)
    expect(loadHeroByIdService.execute).toHaveBeenCalledTimes(1)
    expect(loadHeroByIdService.execute).toHaveBeenLastCalledWith('any_id')
  })

  it('Should return 200 on success', async () => {
    loadHeroByIdService.execute.mockResolvedValueOnce(mockHeroModel())
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(mockHeroModel()))
  })

  it('Should return 403 if loadHeroByIdService returns null', async () => {
    loadHeroByIdService.execute.mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new ParamError(['heroId'])))
  })

  it('Should return 500 if loadHeroByIdService throws', async () => {
    loadHeroByIdService.execute.mockRejectedValueOnce(throwError)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
