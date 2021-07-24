import { ICheckHeroByNameRepository, ICheckHeroByRankRepository, ICreateHeroRepository, ILoadAllHeroRepository } from '@/contracts/repositories'
import { QueryBuilder } from '@/contracts/repositories/query-builder'
import { MongoHelper } from './mongo-helper'

export class HeroRepository implements
ICreateHeroRepository,
ICheckHeroByNameRepository,
ICheckHeroByRankRepository,
ILoadAllHeroRepository {
  async create (heroData: ICreateHeroRepository.Params): Promise<ICreateHeroRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const result = await heroCollection.insertOne({
      ...heroData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result.ops[0] !== null
  }

  async checkByName (name: ICheckHeroByNameRepository.Params): Promise<ICheckHeroByNameRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const hero = await heroCollection.findOne({ name }, {
      projection: {
        _id: 1
      }
    })
    return hero !== null
  }

  async checkByRank (rank: ICheckHeroByRankRepository.Params): Promise<ICheckHeroByRankRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const hero = await heroCollection.findOne({ rank }, {
      projection: {
        _id: 1
      }
    })
    return hero !== null
  }

  async loadAll (): Promise<ILoadAllHeroRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const query = new QueryBuilder()
      .lookup({
        from: 'powerstars',
        foreignField: 'heroeId',
        localField: '_id',
        as: 'result'
      })
      .build()
    const heroes = await heroCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(heroes)
  }
}
