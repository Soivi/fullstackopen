const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('ids is defined', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(r => expect(r.id).toBeDefined())
})

test('a valid blog can be added ', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const authors = blogsAtEnd.map(n => n.author)

  expect(authors).toContain(
    'some author'
  )
})

test('a new blog without likes', async () => {
  let newBlogNoLikes = JSON.parse(JSON.stringify(helper.newBlog))
  delete newBlogNoLikes.likes

  await api
    .post('/api/blogs')
    .send(newBlogNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

test('a new blog without title or url', async () => {
  let newBlogNoUrl = JSON.parse(JSON.stringify(helper.newBlog))
  delete newBlogNoUrl.url

  let newBlogNoTitle = JSON.parse(JSON.stringify(helper.newBlog))
  delete newBlogNoTitle.title

  await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})