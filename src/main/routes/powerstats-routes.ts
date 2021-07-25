import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePowerstatsController,
  makeLoadAllPowerstatsController,
  makeLoadByIdPowerstatsController
} from '@/main/factories/powerstats'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes/:heroId/powerstats', adaptRoute(makeCreatePowerstatsController()))
  router.get('/heroes/:heroId/powerstats', adaptRoute(makeLoadAllPowerstatsController()))
  router.get('/heroes/:heroId/powerstats/:powerstatsId', adaptRoute(makeLoadByIdPowerstatsController()))
}
