import { DeleteHeroByIdController } from '@/controllers/hero'
import { IDeleteHeroById } from '@/contracts/services/hero'
import { forbidden, noContent, serverError } from '@/controllers/http-helper'
import { ParamError } from '@/errors'

import { mock, MockProxy } from 'jest-mock-extended'
import { throwError } from '../../test-helpers'

describe('LoadHeroById Controller', () => {
  let sut: DeleteHeroByIdController
  let deleteHeroByIdService: MockProxy<IDeleteHeroById>
  const request: DeleteHeroByIdController.Request = {
    heroId: 'any_id'
  }

  beforeEach(() => {
    deleteHeroByIdService = mock()
    sut = new DeleteHeroByIdController(deleteHeroByIdService)
  })

  it('Should call service execute with correct value', async () => {
    await sut.handle(request)
    expect(deleteHeroByIdService.execute).toHaveBeenCalledTimes(1)
    expect(deleteHeroByIdService.execute).toHaveBeenLastCalledWith('any_id')
  })

  it('Should return 204 on success', async () => {
    deleteHeroByIdService.execute.mockResolvedValueOnce(true)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(noContent())
  })

  it('Should return 403 if deleteHeroByIdService returns false', async () => {
    deleteHeroByIdService.execute.mockResolvedValueOnce(false)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new ParamError(['heroId'])))
  })

  it('Should return 500 if deleteHeroByIdService throws', async () => {
    deleteHeroByIdService.execute.mockRejectedValueOnce(throwError)
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
