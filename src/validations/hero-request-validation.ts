import { IHeroRequestValidation } from '@/contracts/validations/hero-request-validation'
import { ParamError } from '@/errors'

export class HeroRequestValidation implements IHeroRequestValidation {
  validate (request: IHeroRequestValidation.Params): Error {
    const error: string[] = []
    if (!request.name) {
      error.push(this.paramMissing('name'))
    } else {
      if (this.isCorrectType(request.name, 'string')) {
        error.push(this.paramWrongType('name', 'string'))
      }
    }

    if (!request.description) {
      error.push(this.paramMissing('description'))
    } else {
      if (this.isCorrectType(request.description, 'string')) {
        error.push(this.paramWrongType('description', 'string'))
      }
    }

    if (!request.rank) {
      error.push(this.paramMissing('rank'))
    } else {
      if (this.isCorrectType(request.rank, 'number')) {
        error.push(this.paramWrongType('rank', 'number'))
      }
    }

    if (!request.active) {
      error.push(this.paramMissing('active'))
    } else {
      if (this.isCorrectType(request.active, 'boolean')) {
        error.push(this.paramWrongType('active', 'boolean'))
      }
    }

    return new ParamError(error)
  }

  private paramMissing (paramName: string): string {
    return `${paramName} param is missing`
  }

  private paramWrongType (paramName: string, type: string): string {
    return `${paramName} must be ${type}`
  }

  private isCorrectType (param: any, type: string): boolean {
    return typeof param !== type
  }
}
