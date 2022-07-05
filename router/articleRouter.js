const express = require('express')
const router = express.Router()
const Article = require('../models/articleSchema')

router.get('/new', (req, res) => {
  const article = new Article()
  res.render('articles/new', { article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug  }).sort({ 'createdtAt': 'desc' })
  if(!article) res.redirect('/')
  res.render('articles/show', { article })
})

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })

  try {
    article = await article.save()
    res.redirect(`articles/${article.slug}`)
  } catch (err) {
    res.render('articles/new', { article })
  }
})

module.exports = router