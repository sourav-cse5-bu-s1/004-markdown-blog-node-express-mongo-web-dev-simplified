const express = require('express')
const router = express.Router()
const Article = require('../models/articleSchema')

router.get('/new', (req, res) => {
  const article = new Article()
  res.render('articles/new', { article })
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug  }).sort({ 'createdtAt': 'desc' })
  if(!article) res.redirect('/')
  res.render('articles/show', { article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title,
    article.description = req.body.description,
    article.markdown = req.body.markdown
  
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (err) {
      res.render(`articles/${path}`, { article })
    } 
  }
}

module.exports = router