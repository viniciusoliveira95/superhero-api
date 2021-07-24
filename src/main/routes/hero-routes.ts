import { adaptRoute } from '@/main/adapters'
import { makeCreateHeroController, makeLoadAllHeroesController, makeLoadHeroByIdController } from '@/main/factories/hero'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes', adaptRoute(makeCreateHeroController()))
  router.get('/heroes', adaptRoute(makeLoadAllHeroesController()))
  router.get('/heroes/:heroId', adaptRoute(makeLoadHeroByIdController()))
}
