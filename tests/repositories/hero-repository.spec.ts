import { HeroRepository, MongoHelper } from '@/repositories'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

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

  const otherHeroData = {
    name: 'other_name',
    description: 'other_description',
    active: true,
    rank: 2,
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
      const created = await sut.create({
        name: 'any_name',
        description: 'any_description',
        active: true,
        rank: 1
      })
      expect(created).toBe(true)
    })
  })

  describe('checkById()', () => {
    it('Should return true if hero exists', async () => {
      const hero = await heroCollection.insertOne(heroData)
      const exists = await sut.checkById(hero.ops[0]._id)
      expect(exists).toBe(true)
    })

    it('Should return false if hero does not exists', async () => {
      const exists = await sut.checkById(new FakeObjectId().toHexString())
      expect(exists).toBe(false)
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

  describe('checkByNameAndDiferentId()', () => {
    it('Should return true if name is used by another hero', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByNameAndDiferentId({
        id: heroes.ops[0]._id,
        name: heroes.ops[1].name
      })
      expect(exists).toBe(true)
    })

    it('Should return false if name is used by himself', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByNameAndDiferentId({
        id: heroes.ops[0]._id,
        name: heroes.ops[0].name
      })
      expect(exists).toBe(false)
    })

    it('Should return false if name is not used', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByNameAndDiferentId({
        id: heroes.ops[0]._id,
        name: 'strange_name'
      })
      expect(exists).toBe(false)
    })
  })

  describe('checkByRankAndDiferentId()', () => {
    it('Should return true if rank is used by another hero', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByRankAndDiferentId({
        id: heroes.ops[0]._id,
        rank: heroes.ops[1].rank
      })
      expect(exists).toBe(true)
    })

    it('Should return false if rank is used by himself', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByRankAndDiferentId({
        id: heroes.ops[0]._id,
        rank: heroes.ops[0].rank
      })
      expect(exists).toBe(false)
    })

    it('Should return false if rank is not used', async () => {
      const heroes = await heroCollection.insertMany([heroData, otherHeroData])
      const exists = await sut.checkByRankAndDiferentId({
        id: heroes.ops[0]._id,
        rank: 999
      })
      expect(exists).toBe(false)
    })
  })

  describe('loadAll()', () => {
    it('Should return empty list', async () => {
      const heroes = await sut.loadAll()
      expect(heroes.length).toBe(0)
    })

    it('Should load all heroes on success', async () => {
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

  describe('loadById()', () => {
    it('Should return a hero if hero exists', async () => {
      const res = await heroCollection.insertOne(heroData)
      const hero = await sut.loadById(res.ops[0]._id)
      expect(hero.id).toEqual(res.ops[0]._id)
      expect(hero.name).toEqual(res.ops[0].name)
      expect(hero.description).toEqual(res.ops[0].description)
    })

    it('Should return null if hero does not exists', async () => {
      const hero = await sut.loadById(new FakeObjectId().toHexString())
      expect(hero).toBe(null)
    })
  })

  describe('deleteById()', () => {
    it('Should return true when hero is deleted', async () => {
      const res = await heroCollection.insertOne(heroData)
      const isDeleted = await sut.deleteById(res.ops[0]._id)
      expect(isDeleted).toBe(true)
    })

    it('Should return false when not find a hero to delete', async () => {
      const hero = await sut.deleteById(new FakeObjectId().toHexString())
      expect(hero).toBe(false)
    })
  })

  describe('update()', () => {
    it('Should return true on update success', async () => {
      const res = await heroCollection.insertOne(heroData)
      const updateHero = {
        ...heroData,
        heroId: res.ops[0]._id,
        name: 'updated_name',
        description: 'updated_description'
      }
      const isUpdated = await sut.update(updateHero)
      expect(isUpdated).toBe(true)
    })

    it('Should return false when on update fails', async () => {
      const hero = await sut.update({ ...heroData, heroId: new FakeObjectId().toHexString() })
      expect(hero).toBe(false)
    })
  })
})
