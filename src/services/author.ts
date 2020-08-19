import Author, { AuthorDocument } from '../models/Author'

function create(author: AuthorDocument): Promise<AuthorDocument> {
  return author.save()
}

function findById(authorId: string): Promise<AuthorDocument> {
  return Author.findById(authorId)
    .populate('Book', { title: 1, publishedDate: 1 })
    .exec()
    .then((author) => {
      if (!author) {
        throw new Error(`author ${authorId} not found`)
      }
      return author
    })
}

async function findAll(): Promise<AuthorDocument[]> {
  return Author.find().sort({ firstName: 1 }).exec()
}

function update(
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument> {
  return Author.findById(authorId)
    .exec()
    .then((author) => {
      if (!author) {
        throw new Error(`author ${authorId} not found`)
      }
      if (update.firstName) {
        author.firstName = update.firstName
      }
      if (update.lastName) {
        author.lastName = update.lastName
      }
      if (update.dateOfBirth) {
        author.dateOfBirth = update.dateOfBirth
      }
      if (update.books) {
        author.books = update.books
      }
      return author.save()
    })
}

function deleteAuthor(authorId: string): Promise<AuthorDocument | null> {
  return Author.findByIdAndDelete(authorId).exec()
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteAuthor,
}
