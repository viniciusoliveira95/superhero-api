import {
  ICheckHeroByNameRepository,
  ICheckHeroByRankRepository,
  ICreateHeroRepository,
  ILoadAllHeroesRepository,
  ILoadHeroByIdRepository,
  IDeleteHeroByIdRepository,
  IUpdateHeroRepository
}
  from '@/contracts/repositories/hero'
import { QueryBuilder } from '@/contracts/repositories/query-builder'
import { MongoHelper } from './mongo-helper'

import { ObjectID } from 'mongodb'

export class HeroRepository implements
ICreateHeroRepository,
ICheckHeroByNameRepository,
ICheckHeroByRankRepository,
ILoadAllHeroesRepository,
ILoadHeroByIdRepository,
IDeleteHeroByIdRepository,
IUpdateHeroRepository {
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

  async deleteById (id: string): Promise<IDeleteHeroByIdRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const isDeleted = await heroCollection.findOneAndDelete({ _id: new ObjectID(id) })
    return isDeleted.value !== null
  }

  async loadAll (): Promise<ILoadAllHeroesRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const query = new QueryBuilder()
      .lookup({
        from: 'powerstats',
        foreignField: 'heroId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        name: 1,
        description: 1,
        rank: 1,
        active: 1,
        createdAt: 1,
        updatedAt: 1,
        powerstats: {
          $arrayToObject: {
            $map: {
              input: '$result',
              as: 'item',
              in: [
                '$$item.name',
                '$$item.value'
              ]
            }
          }
        }
      })
      .sort({
        name: 1
      })
      .build()
    const heroes = await heroCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(heroes)
  }

  async loadById (id: string): Promise<ILoadHeroByIdRepository.Result> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectID(id)
      })
      .lookup({
        from: 'powerstats',
        foreignField: 'heroId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        name: 1,
        description: 1,
        rank: 1,
        active: 1,
        createdAt: 1,
        updatedAt: 1,
        powerstats: {
          $arrayToObject: {
            $map: {
              input: '$result',
              as: 'item',
              in: [
                '$$item.name',
                '$$item.value'
              ]
            }
          }
        }
      })
      .build()
    const hero = await heroCollection.aggregate(query).toArray()
    return hero.length ? MongoHelper.map(hero[0]) : null
  }

  async update (heroData: IUpdateHeroRepository.Params): Promise<boolean> {
    const heroCollection = await MongoHelper.getCollection('heroes')
    const isUpdated = await heroCollection.findOneAndUpdate(
      {
        _id: new ObjectID(heroData.id)
      }, {
        $set: {
          name: heroData.name,
          description: heroData.description,
          rank: heroData.rank,
          active: heroData.active,
          updatedAt: new Date()
        }
      }
    )
    return isUpdated.value !== null
  }
}
