import { PowerstatsRepository, MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

describe('Hero Repository', () => {
  let powerstatsCollection: Collection
  let sut: PowerstatsRepository

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
})
