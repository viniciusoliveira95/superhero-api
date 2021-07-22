import { ICreateHeroRepository } from '@/contracts/repositories'
import { MongoHelper } from './mongo-helper'

export class HeroRepository implements ICreateHeroRepository {
  async create (heroData: ICreateHeroRepository.Params): Promise<ICreateHeroRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const result = await heroCollection.insertOne(heroData)
    return result.ops[0] !== null
  }
}
