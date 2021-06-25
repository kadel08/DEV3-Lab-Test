'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../db.js')
const accountManager = require('../src/database/dbAccountManagement.js')
const alert = require('alert')

// const users = []
// initializePassport(passport, email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )
function checkIfSignedIn (req, res, next) {
  if (req.session.user) { next() } else {
    // const err = new Error('Not logged in')
    console.log(req.session.user)
    // next(err)
    alert('User not logged in!')
    res.redirect('/login')
  }
}

mainRouter.get('/', function (req, res) {
  res.render('../views/register.ejs')
})

mainRouter.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'))
  mainRouter.get('/public/home.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/home.css'))
  })
})

mainRouter.get('/creategroup', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'createGroupForm.html'))
  mainRouter.get('/public/form.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/form.css'))
  })
  mainRouter.get('/src/createGroup.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/createGroup.js'))
  })
})

mainRouter.get('/group', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'grouppage.html'))
  mainRouter.get('/public/page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/page.css'))
  })
  mainRouter.get('/utils/hello-and-hi.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '../utils', '/hello-and-hi.jpg'))
  })
})

mainRouter.get('/group/content', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'insidegroups.html'))
  mainRouter.get('/group/team.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/team.html'))
  })
  mainRouter.get('/group/insidegroups.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/insidegroups.html'))
  })
  mainRouter.get('/group/classNotes.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/classNotes.html'))
  })
  mainRouter.get('/group/files.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/files.html'))
  })
  mainRouter.get('/group/poll.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/poll.html'))
  })
  mainRouter.get('/public/insideGroups.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/insideGroups.css'))
  })
  mainRouter.get('/utils/hello-and-hi.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '../utils', '/hello-and-hi.jpg'))
  })
})
mainRouter.get('/sendInvite', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'sendInvite.html'))
  mainRouter.get('/public/form.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/form.css'))
  })
  mainRouter.get('/src/sendInvite.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/sendInvite.js'))
  })
})

mainRouter.get('/register', (req, res) => {
  res.render('../views/register.ejs')
})

mainRouter.post('/register', async function (req, res) {
  // console.log(req.body)
  console.log(accountManager)
  accountManager.addUser(req.body, req, res)
})

mainRouter.get('/profile', checkIfSignedIn, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile.html'))
  mainRouter.get('/public/profile.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/profile.css'))
  })
  mainRouter.get('/src/profile.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/profile.js'))
  })
})

mainRouter.get('/login', function (req, res) {
  console.log(req.body)
  res.render('../views/login.ejs')
})

// Serve html file to js file
mainRouter.get('/chat', checkIfSignedIn, function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'chat.html'))
})
// #******* close this for now by adding 2********#
// mainRouter.post('/login2', passport.authenticate('local', {
//   successRedirect: '/home',
//   failureRedirect: '/login',
//   failureFlash: true
// }))
// #******* close this for now ********#

mainRouter.post('/login', function (req, res) {
  accountManager.login(req.body, req, res)
})

mainRouter.delete('/logout', checkIfSignedIn, function (req, res) {
  req.logOut()
  req.session.destroy(function () { })
  res.redirect('/login')
})

mainRouter.delete('/logout', function (req, res) {
  req.logOut()
  res.redirect('/login')
})

mainRouter.get('/database', function (req, res) {
  // Make a query to the database
  db.pools
  // Run query
    .then((pool) => {
      return pool.request()
      // This is only a test query, change it to whatever you need
        .query('SELECT 1')
    })
  // Send back the result
    .then(result => {
      res.send(result)
    })
  // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = mainRouter
