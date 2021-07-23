import { HeroRequestValidation } from '@/validations'
import { ParamError } from '@/errors'

describe('HeroRequestValidation', () => {
  let sut: HeroRequestValidation
  const request = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true
  }

  beforeEach(() => {
    sut = new HeroRequestValidation()
  })

  it('Should return nothing when request obj is correct', () => {
    const error = sut.validate(request)
    expect(error).toBeFalsy()
  })

  it('Should return param error when name is missing and active have a wrong type', () => {
    const error = sut.validate({
      description: 'any_description',
      rank: 1,
      active: 'any_value'
    })
    expect(error).toEqual(new ParamError(['name param is missing', 'active must be boolean']))
  })

  it('Should return param error when all params is missing', () => {
    const error = sut.validate({})
    expect(error).toEqual(new ParamError([
      'name param is missing',
      'description param is missing',
      'rank param is missing',
      'active param is missing'
    ]))
  })

  it('Should return param error when all params have wrong types', () => {
    const error = sut.validate({
      name: 122,
      description: 123,
      rank: 'any_value',
      active: 'any_value'
    })
    expect(error).toEqual(new ParamError([
      'name must be string',
      'description must be string',
      'rank must be number',
      'active must be boolean'
    ]))
  })
})
