import { HeroModel } from '@/contracts/models'

export const mockHeroModel = (): HeroModel => ({
  id: 'any_id',
  name: 'any_name',
  description: 'any_description',
  active: true,
  rank: 1,
  createdAt: new Date(2021, 7, 24),
  updatedAt: new Date(2021, 7, 25),
  powerstats: {
    power: 99,
    intelligence: 60
  }
})

export const mockHeroesModel = (): HeroModel[] => ([
  {
    id: 'any_id',
    name: 'any_name',
    description: 'any_description',
    active: true,
    rank: 1,
    createdAt: new Date(2021, 7, 24),
    updatedAt: new Date(2021, 7, 25),
    powerstats: {
      power: 99,
      intelligence: 60
    }
  },
  {
    id: 'other_id',
    name: 'other_name',
    description: 'other_description',
    active: true,
    rank: 2,
    createdAt: new Date(2021, 6, 23),
    updatedAt: new Date(2021, 6, 24),
    powerstats: {
      power: 99,
      intelligence: 60
    }
  }
])
