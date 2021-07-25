import { IPowerstatsRequestValidation } from '@/contracts/validations'
import { ParamError } from '@/errors'

export class PowerStatsRequestValidation implements IPowerstatsRequestValidation {
  validate (request: any): Error {
    const error: string[] = []
    if (!request.name) {
      error.push(this.paramMissing('name'))
    } else {
      if (this.isCorrectType(request.name, 'string')) {
        error.push(this.paramWrongType('name', 'string'))
      }
    }

    if (!request.value) {
      error.push(this.paramMissing('value'))
    } else {
      if (this.isCorrectType(request.value, 'number')) {
        error.push(this.paramWrongType('value', 'number'))
      }
    }

    if (error.length > 0) {
      return new ParamError(error)
    }
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
