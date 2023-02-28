const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password && password.length > 2) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } else {
    return response.status(400).json({
      error: 'password is missing or it is shorter than 3 letters'
    })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users)
})

module.exports = usersRouter