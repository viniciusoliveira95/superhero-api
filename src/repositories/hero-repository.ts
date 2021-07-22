import { ICheckHeroByNameRepository, ICheckHeroByRankRepository, ICreateHeroRepository } from '@/contracts/repositories'
import { MongoHelper } from './mongo-helper'

export class HeroRepository implements
ICreateHeroRepository,
ICheckHeroByNameRepository,
ICheckHeroByRankRepository {
  async create (heroData: ICreateHeroRepository.Params): Promise<ICreateHeroRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const result = await heroCollection.insertOne(heroData)
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
}
