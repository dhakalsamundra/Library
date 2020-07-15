import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
import { AuthorDocument } from '../../src/models/Author'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<AuthorDocument>) {
  let user = {
    firstName: 'Samundra',
    lastName: 'Dhakal',
    email: 'samundra.dhakal@integrify.io',
  }
  if (override) {
    user = { ...user, ...override }
  }
  return await request(app).post('/api/v1/users').send(user)
}
describe('user controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should add new user to the db', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe('Samundra')
  })

  test('should not create a user with empty field', async () => {
    const res = await request(app).post('/api/v1/authors').send({
      lastName: 'Dhakal',
    })
    expect(res.status).toBe(400)
  })

  it('should get an existing author', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.id
    const response = await request(app).get(`/api/v1/users/${userId}`)
    expect(response.body.id).toEqual(userId)
  })

  it('should not get back a non-existing user', async () => {
    const res = await request(app).get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all authors', async () => {
    const res1 = await createUser({
      firstName: 'Samundra',
      lastName: 'Dhakal',
    })
    const res2 = await createUser({
      firstName: 'sagar',
      lastName: 'singh',
    })
    const res3 = await request(app).get('/api/v1/users')
    console.log(res3.body)
    expect(res3.body.length).toEqual(2)
    expect(res3.body[0].id).toEqual(res1.body.id)
    expect(res3.body[1].id).toEqual(res2.body.id)
  })

  test('should update an existing user', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body.id
    const update = {
      firstName: 'Sandesh',
      lastName: 'Dhakal',
    }
    const response = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send(update)

    expect(response.status).toEqual(200)
    expect(response.body.firstName).toEqual('Sandesh')
    expect(response.body.lastName).toEqual('Dhakal')
  })

  test('should delete an existing users', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body.id

    res = await request(app).delete(`/api/v1/authors/${userId}`)
    expect(res.status).toBe(204)
  })
})
