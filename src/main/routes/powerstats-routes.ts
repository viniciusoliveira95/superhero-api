import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePowerstatsController,
  makeDeletePowerstatsController,
  makeLoadAllPowerstatsController,
  makeLoadByIdPowerstatsController,
  makeUpdatePowerstatsController
} from '@/main/factories/powerstats'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes/:heroId/powerstats', adaptRoute(makeCreatePowerstatsController()))
  router.get('/heroes/:heroId/powerstats', adaptRoute(makeLoadAllPowerstatsController()))
  router.get('/heroes/:heroId/powerstats/:powerstatsId', adaptRoute(makeLoadByIdPowerstatsController()))
  router.put('/heroes/:heroId/powerstats/:powerstatsId', adaptRoute(makeUpdatePowerstatsController()))
  router.delete('/heroes/:heroId/powerstats/:powerstatsId', adaptRoute(makeDeletePowerstatsController()))
}
