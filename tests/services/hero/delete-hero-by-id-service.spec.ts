import { throwError } from '@/tests/test-helpers'
import { IDeleteHeroByIdRepository } from '@/contracts/repositories/hero'
import { DeleteHeroByIdService } from '@/services/hero'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteHeroByIdService', () => {
  let deleteHeroByIdRepository: MockProxy<IDeleteHeroByIdRepository>
  let sut: DeleteHeroByIdService

  beforeEach(() => {
    deleteHeroByIdRepository = mock()
    sut = new DeleteHeroByIdService(deleteHeroByIdRepository)
  })

  it('Should call deleteHeroByIdRepository with correct value', async () => {
    await sut.execute('any_id')
    expect(deleteHeroByIdRepository.deleteById).toHaveBeenCalledTimes(1)
    expect(deleteHeroByIdRepository.deleteById).toHaveBeenCalledWith('any_id')
  })

  it('Should throw if loadHeroByIdRepository throws', async () => {
    deleteHeroByIdRepository.deleteById.mockRejectedValueOnce(throwError)
    const promise = sut.execute('any_id')
    await expect(promise).rejects.toThrow()
  })

  it('Should return true on hero deletion success', async () => {
    deleteHeroByIdRepository.deleteById.mockResolvedValueOnce(true)
    const isDeleted = await sut.execute('any_id')
    expect(isDeleted).toEqual(true)
  })

  it('Should return false on hero deletion fail', async () => {
    deleteHeroByIdRepository.deleteById.mockResolvedValueOnce(false)
    const isDeleted = await sut.execute('any_id')
    expect(isDeleted).toEqual(false)
  })
})
