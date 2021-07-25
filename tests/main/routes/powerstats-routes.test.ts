import app from '@/main/config/app'
import { MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import request from 'supertest'
import FakeObjectId from 'bson-objectid'

describe('Powerstats Routes', () => {
  let heroesCollection: Collection
  let powerstatsCollection: Collection
  const heroData = {
    name: 'any_name',
    description: 'any_description',
    rank: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  const powerstatsData = {
    name: 'any_name',
    value: 100,
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
    powerstatsCollection = await MongoHelper.getCollection('powerstats')
    await powerstatsCollection.deleteMany({})
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

  describe('GET /heroes/:heroId/powerstats', () => {
    it('Should reuturn 204 when hero powerstats are empty', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .get(`/api/heroes/${heroId}/powerstats`)
        .expect(204)
    })

    it('Should reuturn 200 on success', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await powerstatsCollection.insertOne({
        ...powerstatsData,
        heroId
      })
      await request(app)
        .get(`/api/heroes/${heroId}/powerstats`)
        .expect(200)
    })
  })

  describe('GET /heroes/:heroId/powerstats/:powerstatsId', () => {
    it('Should reuturn 200 on success', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      const powerstats = await powerstatsCollection.insertOne({
        ...powerstatsData,
        heroId
      })
      const powerstatsDataId: string = powerstats.ops[0]._id
      await request(app)
        .get(`/api/heroes/${heroId}/powerstats/${powerstatsDataId}`)
        .expect(200)
    })

    it('Should reuturn 204 when powerstats does exists', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      await request(app)
        .get(`/api/heroes/${heroId}/powerstats/${new FakeObjectId().toHexString()}`)
        .expect(204)
    })
  })

  describe('UPDATE /heroes/:heroId/powerstats/:powerstatsId', () => {
    it('Should reuturn 204 when update a powerstats', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      const powerstats = await powerstatsCollection.insertOne({
        ...powerstatsData,
        heroId
      })
      const powerstatsDataId: string = powerstats.ops[0]._id
      await request(app)
        .put(`/api/heroes/${heroId}/powerstats/${powerstatsDataId}`)
        .send({
          name: 'updated_name',
          value: 100
        })
        .expect(204)
    })
  })

  describe('DELETE /heroes/:heroId/powerstats/:powerstatsId', () => {
    it('Should reuturn 204 when delete a powerstats', async () => {
      const hero = await heroesCollection.insertOne(heroData)
      const heroId: string = hero.ops[0]._id
      const powerstats = await powerstatsCollection.insertOne({
        ...powerstatsData,
        heroId
      })
      const powerstatsDataId: string = powerstats.ops[0]._id
      await request(app)
        .delete(`/api/heroes/${heroId}/powerstats/${powerstatsDataId}`)
        .expect(204)
    })
  })
})
