import { HttpResponse } from '@/contracts/http/http'

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
