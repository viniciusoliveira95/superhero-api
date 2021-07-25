import { adaptRoute } from '@/main/adapters'
import { makeCreateHeroController, makeLoadAllHeroesController, makeLoadHeroByIdController, makeDeleteHeroByIdController, makeUpdateHeroController } from '@/main/factories/hero'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes', adaptRoute(makeCreateHeroController()))
  router.get('/heroes', adaptRoute(makeLoadAllHeroesController()))
  router.get('/heroes/:heroId', adaptRoute(makeLoadHeroByIdController()))
  router.delete('/heroes/:heroId', adaptRoute(makeDeleteHeroByIdController()))
  router.put('/heroes/:heroId', adaptRoute(makeUpdateHeroController()))
}
