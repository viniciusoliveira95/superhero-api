import {
  ICreatePowerstatsRepository,
  ILoadAllPowerstatsRepository
}
  from '@/contracts/repositories/powerstats'
import { MongoHelper } from './mongo-helper'

import { ObjectID } from 'mongodb'
import { QueryBuilder } from '@/contracts/repositories/query-builder'

export class PowerstatsRepository implements
ICreatePowerstatsRepository,
ILoadAllPowerstatsRepository {
  async create (powerstatsData: ICreatePowerstatsRepository.Params): Promise<ICreatePowerstatsRepository.Result> {
    const powerstatsCollection = await MongoHelper.getCollection('powerstats')
    const result = await powerstatsCollection.insertOne({
      ...powerstatsData,
      heroId: new ObjectID(powerstatsData.heroId),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result.ops[0] !== null
  }

  async loadAll (heroId: ILoadAllPowerstatsRepository.Param): Promise<ILoadAllPowerstatsRepository.Result> {
    const powerstatsCollection = await MongoHelper.getCollection('powerstats')
    const query = new QueryBuilder()
      .match({
        heroId: new ObjectID(heroId)
      })
      .project({
        heroId: 1,
        name: 1,
        value: 1,
        createdAt: 1,
        updatedAt: 1
      })
      .sort({
        name: 1
      })
      .build()
    const powerstats = await powerstatsCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(powerstats)
  }
}
