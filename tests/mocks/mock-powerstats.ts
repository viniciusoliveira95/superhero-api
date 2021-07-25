import { PowerstatsModel } from '@/contracts/models'

export const mockPowerstatsModel = (): PowerstatsModel => ({
  id: 'any_id',
  heroId: 'any_heroId',
  name: 'any_name',
  value: 50,
  createdAt: new Date(2021, 7, 24),
  updatedAt: new Date(2021, 7, 25)
})

export const mockPowerstatsListModel = (): PowerstatsModel[] => ([
  {
    id: 'any_id',
    heroId: 'any_heroId',
    name: 'any_name',
    value: 50,
    createdAt: new Date(2021, 7, 24),
    updatedAt: new Date(2021, 7, 25)
  },
  {
    id: 'other_id',
    heroId: 'other_heroId',
    name: 'other_name',
    value: 90,
    createdAt: new Date(2021, 7, 24),
    updatedAt: new Date(2021, 7, 25)
  }
])
