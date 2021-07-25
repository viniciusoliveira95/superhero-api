import { adaptRoute } from '@/main/adapters'
import { makeCreatePowerstatsController } from '@/main/factories/powerstats'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/heroes/:heroId/powerstats', adaptRoute(makeCreatePowerstatsController()))
}
