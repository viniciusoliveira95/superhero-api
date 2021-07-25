import app from '@/main/config/app'
import { MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import request from 'supertest'

describe('Powerstats Routes', () => {
  let heroesCollection: Collection
  const heroData = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    heroesCollection = await MongoHelper.getCollection('heroes')
    await heroesCollection.deleteMany({})
  })

  describe('POST /heroes/:heroId/powerstats', () => {
    it('Should reuturn 204 when create a powerstats', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .post(`/api/heroes/${heroId}/powerstats`)
        .send({
          name: 'any_name',
          value: 10
        })
        .expect(204)
    })
  })
})
