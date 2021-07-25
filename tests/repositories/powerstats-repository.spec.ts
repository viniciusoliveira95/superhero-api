import { PowerstatsRepository, MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

describe('Powerstats Repository', () => {
  let powerstatsCollection: Collection
  let sut: PowerstatsRepository
  const heroId = new FakeObjectId()
  const powerstatsData1 = {
    heroId,
    name: 'any_name',
    value: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const powerstatsData2 = {
    heroId,
    name: 'other_name',
    value: 20,
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
    sut = new PowerstatsRepository()
    powerstatsCollection = await MongoHelper.getCollection('powerstats')
    await powerstatsCollection.deleteMany({})
  })

  describe('create()', () => {
    it('Should return true on create success', async () => {
      const created = await sut.create({
        heroId: new FakeObjectId().toHexString(),
        name: 'any_name',
        value: 10
      })
      expect(created).toBe(true)
    })
  })

  describe('loadAll()', () => {
    it('Should return a list of powerstats on success', async () => {
      await powerstatsCollection.insertMany([powerstatsData1, powerstatsData2])
      const powerstats = await sut.loadAll(heroId.toHexString())
      expect(powerstats[0].id).toBeTruthy()
      expect(powerstats[0].name).toEqual('any_name')
      expect(powerstats[1].id).toBeTruthy()
      expect(powerstats[1].name).toEqual('other_name')
    })

    it('Should return a empty list when hero dont have any powerstats', async () => {
      const powerstats = await sut.loadAll(heroId.toHexString())
      expect(powerstats.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    it('Should return a powerstats on success', async () => {
      const result = await powerstatsCollection.insertOne(powerstatsData1)
      const powerstats = await sut.loadById({
        powerstatsId: result.ops[0]._id,
        heroId: heroId.toHexString()
      })
      expect(powerstats.id).toBeTruthy()
      expect(powerstats.name).toBe(powerstatsData1.name)
      expect(powerstats.value).toBe(powerstatsData1.value)
    })

    it('Should return null when dont find a powerstats', async () => {
      const powerstats = await sut.loadById({
        heroId: new FakeObjectId().toHexString(),
        powerstatsId: new FakeObjectId().toHexString()
      })
      expect(powerstats).toBe(null)
    })
  })

  describe('update()', () => {
    it('Should return true on update success', async () => {
      const result = await powerstatsCollection.insertOne(powerstatsData1)
      const updateHero = {
        heroId: heroId.toHexString(),
        powerstatsId: result.ops[0]._id,
        name: 'updated_name',
        value: 50
      }
      const isUpdated = await sut.update(updateHero)
      expect(isUpdated).toBe(true)
    })

    it('Should return false when on update fails', async () => {
      const hero = await sut.update({
        heroId: heroId.toHexString(),
        powerstatsId: new FakeObjectId().toHexString(),
        name: 'any_name',
        value: 0
      })
      expect(hero).toBe(false)
    })
  })
})
