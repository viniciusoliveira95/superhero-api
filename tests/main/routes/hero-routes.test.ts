import app from '@/main/config/app'
import { MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import request from 'supertest'
import FakeObjectId from 'bson-objectid'

describe('Hero Routes', () => {
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
      await heroesCollection.insertOne(heroData)
      await request(app)
        .get('/api/heroes')
        .expect(200)
    })
  })

  describe('GET /heroes/:heroId', () => {
    it('Should reuturn 403 when heroId is invalid', async () => {
      await request(app)
        .get(`/api/heroes/${new FakeObjectId().toHexString()}`)
        .expect(403)
    })

    it('Should reuturn 200 on success', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .get(`/api/heroes/${heroId}`)
        .expect(200)
    })
  })

  describe('PUT /heroes/:heroId', () => {
    it('Should reuturn 204 when update a hero', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .put(`/api/heroes/${heroId}`)
        .send({
          name: 'updated_name',
          description: 'updated_description',
          rank: 2,
          active: true
        })
        .expect(204)
    })
  })

  describe('DELETE /heroes/:heroId', () => {
    it('Should reuturn 403 when heroId is invalid', async () => {
      await request(app)
        .delete(`/api/heroes/${new FakeObjectId().toHexString()}`)
        .expect(403)
    })

    it('Should reuturn 204 on success', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .delete(`/api/heroes/${heroId}`)
        .expect(204)
    })
  })
})
