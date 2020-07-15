import request from 'supertest'

import Book, { BookDocument } from '../../src/models/Book'
import app from '../../src/app'
import * as dbHelper from '../db-helper'
import { response } from 'express'
import book from '../../src/services/book'

const nonExistingBookId = '5e57b77b5744fa0b461c7906'

async function createBook(override?: Partial<BookDocument>) {
  let book = {
    title: 'Lost Ship',
    ISBN: '123-43-5678',
    publishedDate: new Date('2017-10-23'),
    publisher: 'Oxford Academy',
    genres: 'Mystery',
  }
  if (override) {
    book = { ...book, ...override }
  }
  return await request(app).post('/api/v1/books').send(book)
}

describe('book controller', () => {
  beforeEach(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Lost Ship')
  })

  test('will not create a new book with some required field empty', async () => {
    const res = await request(app).post('/api/v1/books').send({
      ISBN: '123-43-5678',
    })
    expect(res.status).toBe(400)
  })

  it('should get an existing book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body.id
    const response = await request(app).get(`/api/v1/books/${bookId}`)
    expect(response.body.id).toEqual(bookId)
  })

  it(' should not get back non- exixting book', async () => {
    const res = await request(app).get(`/api/v1/books/${nonExistingBookId}`)
    expect(res.status).toBe(404)
  })

  it('get all lists of the books', async () => {
    const res1 = await createBook({
      title: 'The Da Vinci Code',
      ISBN: '123-45-6788',
      publishedDate: new Date('2016-12-23'),
      genres: 'Thiller',
    })
    const res2 = await createBook({
      title: 'Sapiens',
      ISBN: '123-45-6788',
      publishedDate: new Date('2016-2-23'),
      genres: 'history',
    })
    const res3 = await request(app).get('/api/v1/books')

    expect(res3.body.book.length).toEqual(2)
    expect(res3.body.book[0].id).toEqual(res1.body.id)
    expect(res3.body.book[1].id).toEqual(res2.body.id)
  })

  it('should update an existing book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      title: 'Novel Academy',
    }
    const response = await request(app)
      .put(`/api/v1/books/${bookId}`)
      .send(update)

    expect(response.status).toEqual(200)
    expect(response.body.title).toEqual('Novel Academy')
  })

  it('delete an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app).delete(`/api/v1/books/${bookId}`)
    expect(res.status).toEqual(204)
  })

  test('borrowing the book', async () => {
    const res1 = await createBook({
      title: 'Lost Ship',
      ISBN: '123-43-5678',
      status: 'available',
      publishedDate: new Date('2017-10-23'),
      genres: 'Mystery',
    })
    const bookId = res1.body._id
    console.log(bookId)

    const res2 = await request(app).put(`/api/v1/books/${bookId}/borrow`)
    console.log(
      'dnfnadsivdsi vf sivsdib d ifbasdbnfins jdsnfinbsdibfsa vfbsbrwibfe savbwiarbv niasbvibnasin vcbnisabviafns vasbdvbsaf sbvdasfkjv  k vasbfvnsak n vbasijvnsajkn k vbsdavnsakjnv kb vsdbnvkas k kb visabdvkans dk  viasdbvks ak b vawd vkj',
      res2.body
    )

    expect(res2.body.status).toEqual('borrowed')
  })
  // test('returning the book', async () => {
  //   const res1 = await createBook({
  //     title: 'Lost Ship',
  //     ISBN: '123-43-5678',
  //     status: 'borrowed',
  //     publishedDate: new Date('2017-10-23'),
  //     genres: 'Mystery',
  //   })
  //   const bookId = res1.body.id
  //   console.log('----------->', bookId)
  //   const res2 = await request(app).put(`/api/v1/books/${bookId}/return`)
  //   console.log('returning book', res2)

  //   expect(res2.body.status).toEqual('available')
  // })
})
