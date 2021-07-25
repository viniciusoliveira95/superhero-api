import {
  ICreatePowerstatsRepository,
  IDeletePowerstatsRepository,
  ILoadAllPowerstatsRepository,
  ILoadByIdPowerstatsRepository,
  IUpdatePowerstatsRepository
}
  from '@/contracts/repositories/powerstats'
import { MongoHelper } from './mongo-helper'

import { ObjectID } from 'mongodb'
import { QueryBuilder } from '@/contracts/repositories/query-builder'

export class PowerstatsRepository implements
ICreatePowerstatsRepository,
ILoadAllPowerstatsRepository,
ILoadByIdPowerstatsRepository,
IUpdatePowerstatsRepository,
IDeletePowerstatsRepository {
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

  async delete (data: IDeletePowerstatsRepository.Param): Promise<IDeletePowerstatsRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('powerstats')
    const isDeleted = await heroCollection.findOneAndDelete({
      _id: new ObjectID(data.powerstatsId),
      heroId: new ObjectID(data.heroId)
    })
    return isDeleted.value !== null
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

  async loadById (data: ILoadByIdPowerstatsRepository.Param): Promise<ILoadByIdPowerstatsRepository.Result> {
    const powerstatsCollection = await MongoHelper.getCollection('powerstats')
    const result = await powerstatsCollection.findOne({
      _id: new ObjectID(data.powerstatsId),
      heroId: new ObjectID(data.heroId)
    })
    return result && MongoHelper.map(result)
  }

  async update (data: IUpdatePowerstatsRepository.Params): Promise<IUpdatePowerstatsRepository.Result> {
    const powerstatsCollection = await MongoHelper.getCollection('powerstats')
    const isUpdated = await powerstatsCollection.findOneAndUpdate(
      {
        _id: new ObjectID(data.powerstatsId),
        heroId: new ObjectID(data.heroId)
      }, {
        $set: {
          name: data.name,
          value: data.value,
          updatedAt: new Date()
        }
      }
    )
    return isUpdated.value !== null
  }
}
