import {
  ICreatePowerstatsRepository
}
  from '@/contracts/repositories/powerstats'
import { MongoHelper } from './mongo-helper'

import { ObjectID } from 'mongodb'

export class PowerstatsRepository implements
ICreatePowerstatsRepository {
  async create (powerstatsData: ICreatePowerstatsRepository.Params): Promise<ICreatePowerstatsRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('powerstats')
    const result = await heroCollection.insertOne({
      ...powerstatsData,
      heroId: new ObjectID(powerstatsData.heroId),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result.ops[0] !== null
  }
}
