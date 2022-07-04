const express = require('express')
const ejs = require('ejs')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const articles = [
    {
      title: 'Test Article 1',
      createdAt: new Date(),
      description: 'Test Description 1'
    },
    {
      title: 'Test Article 2',
      createdAt: new Date(),
      description: 'Test Description 2'
    }
  ]
  res.render('index', { articles: articles })
})

app.listen(5000)