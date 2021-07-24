import app from '@/main/config/app'
import { MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import request from 'supertest'

describe('Hero Routes', () => {
  let heroesCollection: Collection

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

  describe('POST /heroes', () => {
    it('Should reuturn 204 when create a hero', async () => {
      await request(app)
        .post('/api/heroes')
        .send({
          name: 'any_name',
          description: 'any_description',
          rank: 1,
          active: true
        })
        .expect(204)
    })
  })

  describe('GET /heroes', () => {
    it('Should reuturn 204 when heroes collection is empty', async () => {
      await request(app)
        .get('/api/heroes')
        .expect(204)
    })

    it('Should reuturn 200 on success', async () => {
      await heroesCollection.insertOne({
        name: 'any_name',
        description: 'any_description',
        rank: 1,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      await request(app)
        .get('/api/heroes')
        .expect(200)
    })
  })
})
