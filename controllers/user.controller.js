const fs = require('fs')
const path = require('path')
const { title } = require('process')

const getUsers = () =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8'),
  )

const storeUser = (user) => {
  const users = getUsers()
  const usersMoreOne = [...users, user]
  fs.writeFileSync(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify(usersMoreOne, null, 3),
    'utf-8',
  )
}

const updateUser = (users) => {
  fs.writeFileSync(
    path.join(__dirname, '../data/users.json'),
    JSON.stringify(users, null, 3),
    'utf-8',
  )
}
module.exports = {
  usersList: (req, res) => {
    const users = getUsers()
    return res.render('usersList', { users })
  },

  userSearch: (req, res) => {
    const { keyword } = req.query

    const users = getUsers()
    const usersFind = users.filter(
      (user) =>
        user.last_name.toLowerCase().includes(keyword.toLowerCase()) ||
        user.first_name.toLowerCase().includes(keyword.toLowerCase()),
    )
    res.render('usersList', { users: usersFind, title: 'User Find' })
  },

  userAdd: (req, res) => {
    return res.render('userAdd')
  },
  userStore: (req, res) => {
    const { first_name, last_name, email, password } = req.body
    const users = getUsers()
    const newId = users[users.length - 1].id + 1
    const newUser = {
      id: newId,
      first_name,
      last_name,
      email,
      gender: '',
      password,
      avatar:
        'https://aaahockey.org/wp-content/uploads/2017/06/default-avatar-300x300.png',
      address: '',
    }
    storeUser(newUser)
    res.redirect(`/#${newId}`)
  },

  userEdit: (req, res) => {
    const userIdParams = +req.params.id
    const users = getUsers()
    const userFind = users.find((user) => user.id === userIdParams)
    return res.render('userEdit', { user: userFind })
  },

  userUpdated: (req, res) => {
    const userId = +req.params.id
    const users = getUsers()
    const usersUpdated = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          ...req.body,
        }
      } else {
        return user
      }
    })
    updateUser(usersUpdated)
    res.redirect(`/#${userId}`)
  },

  userDelete: (req, res) => {
    const userId = +req.params.id
    const users = getUsers()
    const usersMinorOne = users.filter((user) => user.id !== userId)
    updateUser(usersMinorOne)
    return res.redirect('/')
  },
}
