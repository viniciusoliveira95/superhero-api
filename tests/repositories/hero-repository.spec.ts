import { HeroRepository, MongoHelper } from '@/repositories'
import { ICreateHeroRepository } from 'contracts/repositories'

import { Collection } from 'mongodb'

describe('Hero Repository', () => {
  let heroCollection: Collection
  let sut: HeroRepository
  const heroData: ICreateHeroRepository.Params = {
    name: 'any_name',
    description: 'any_description',
    active: true,
    rank: 0
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    sut = new HeroRepository()
    heroCollection = await MongoHelper.getCollection('heroes')
    await heroCollection.deleteMany({})
  })

  describe('create()', () => {
    it('Should return true on create success', async () => {
      const created = await sut.create(heroData)
      expect(created).toBe(true)
    })
  })

  describe('checkByName()', () => {
    it('Should return true if name is already used', async () => {
      await heroCollection.insertOne(heroData)
      const exists = await sut.checkByName(heroData.name)
      expect(exists).toBe(true)
    })

    it('Should return false if name is not used', async () => {
      const exists = await sut.checkByName(heroData.name)
      expect(exists).toBe(false)
    })
  })

  describe('checkByRank()', () => {
    it('Should return true if rank is already used', async () => {
      await heroCollection.insertOne(heroData)
      const exists = await sut.checkByRank(heroData.rank)
      expect(exists).toBe(true)
    })

    it('Should return false if rank is not used', async () => {
      const exists = await sut.checkByRank(heroData.rank)
      expect(exists).toBe(false)
    })
  })

  describe('loadAll()', () => {
    it('Should return empty list', async () => {
      const heroes = await sut.loadAll()
      expect(heroes.length).toBe(0)
    })
  })
})
