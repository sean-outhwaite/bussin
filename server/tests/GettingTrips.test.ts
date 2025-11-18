import { describe, it, expect } from 'vitest'
import request from 'supertest'

import server from '../server.ts'


describe('Getting Trips', () => {
  it('Returns a delay vaue', async () => {
    const res = await request(server).get('/api/v1/trips')
    expect(res.body[0].delay).toBeDefined()
  })
})
