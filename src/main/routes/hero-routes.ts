import { adaptRoute } from '@/main/adapters'
import { makeCreateHeroController } from '@/main/factories/hero'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes', adaptRoute(makeCreateHeroController()))
}
