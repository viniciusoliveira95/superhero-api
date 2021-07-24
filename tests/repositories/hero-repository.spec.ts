import { HeroRepository, MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'

describe('Hero Repository', () => {
  let heroCollection: Collection
  let powerstatsCollection: Collection
  let sut: HeroRepository
  const heroData = {
    name: 'any_name',
    description: 'any_description',
    active: true,
    rank: 1,
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
    sut = new HeroRepository()
    heroCollection = await MongoHelper.getCollection('heroes')
    await heroCollection.deleteMany({})
    powerstatsCollection = await MongoHelper.getCollection('powerstats')
    await powerstatsCollection.deleteMany({})
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

    it('Should load all heroes on success', async () => {
      const otherHeroData = {
        name: 'other_name',
        description: 'other_description',
        active: true,
        rank: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const result = await heroCollection.insertMany([heroData, otherHeroData])
      const hero = result.ops[0]
      const strength = {
        heroId: hero._id,
        name: 'strength',
        value: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      const intelligence = {
        heroId: hero._id,
        name: 'intelligence',
        value: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await powerstatsCollection.insertMany([strength, intelligence])
      const heroes = await sut.loadAll()
      expect(heroes).toBeTruthy()
      expect(heroes[0].id).toEqual(hero._id)
      expect(heroes[0].name).toEqual(heroData.name)
      expect(heroes[0].rank).toEqual(heroData.rank)
      expect(heroes[0].powerstats.strength).toEqual(strength.value)
      expect(heroes[0].powerstats.intelligence).toEqual(intelligence.value)
      expect(heroes[1].name).toEqual(otherHeroData.name)
      expect(heroes[1].rank).toEqual(otherHeroData.rank)
    })

    it('Should hero.powerstats return empty object when the are no powerstats', async () => {
      await heroCollection.insertOne(heroData)
      const heroes = await sut.loadAll()
      expect(heroes[0].powerstats).toEqual({})
    })
  })
})
