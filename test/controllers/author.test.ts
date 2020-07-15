import request from 'supertest'

import Author, { AuthorDocument } from '../../src/models/Author'
import app from '../../src/app'
import * as dbHelper from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor(override?: Partial<AuthorDocument>) {
  let author = {
    firstName: 'Samundra',
    lastName: 'Dhakal',
    dateOfBirth: new Date('2018-12-02'),
    books: ['Sapiens'],
  }
  if (override) {
    author = { ...author, ...override }
  }
  return await request(app).post('/api/v1/authors').send(author)
}

describe('author controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a author', async () => {
    const res = await createAuthor()
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe('Samundra')
  })

  test('should not create a author with empty field', async () => {
    const res = await request(app).post('/api/v1/authors').send({
      lastName: 'Dhakal',
    })
    expect(res.status).toBe(400)
  })

  it('should get an existing author', async () => {
    const res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body.id
    const response = await request(app).get(`/api/v1/authors/${authorId}`)
    expect(response.body.id).toEqual(authorId)
  })

  it('should not get back a non-existing author', async () => {
    const res = await request(app).get(`/api/v1/authors/${nonExistingAuthorId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all authors', async () => {
    const res1 = await createAuthor({
      firstName: 'Pawan',
      lastName: 'singh',
      dateOfBirth: new Date('2001-12-21'),
      books: ['ABC'],
    })
    const res2 = await createAuthor({
      firstName: 'sagar',
      lastName: 'singh',
      dateOfBirth: new Date('2001-12-21'),
      books: ['DEF'],
    })
    const res3 = await request(app).get('/api/v1/authors')
    console.log(res3.body)
    expect(res3.body.length).toEqual(2)
    expect(res3.body[0].id).toEqual(res1.body.id)
    expect(res3.body[1].id).toEqual(res2.body.id)
  })

  test('should update an existing author', async () => {
    const res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body.id
    const update = {
      firstName: 'Sandesh',
      lastName: 'Dhakal',
    }
    const response = await request(app)
      .put(`/api/v1/authors/${authorId}`)
      .send(update)

    expect(response.status).toEqual(200)
    expect(response.body.firstName).toEqual('Sandesh')
    expect(response.body.lastName).toEqual('Dhakal')
  })

  test('should delete an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)
    const authorId = res.body.id

    res = await request(app).delete(`/api/v1/authors/${authorId}`)
    expect(res.status).toBe(204)
  })
})
