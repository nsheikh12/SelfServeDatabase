const express = require('express')
const router = express.Router()
const Article = require('../models/articleModel')

// Get all
router.get('/', async (req, res) => {
    try {
        const article = await Article.find()
        res.json(article)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getArticle, (req, res) => {
    res.json(res.article)
})

// Create one
router.post('/', async (req, res) => {
    const article = new Article({
        submittedBy: req.body.submittedBy,
        articleNumber: req.body.articleNumber,
        requestingPerson: req.body.requestingPerson,
        createdOn: req.body.createdOn,
        category: req.body.category,
        status: req.body.status,
        assignedTo: req.body.assignedTo,
        articleTitle: req.body.articleTitle,
        body: req.body.body
    })

    try{
        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// Update one
router.patch('/:id', getArticle, async (req, res) => {
    if (req.body.articleTitle != null) {
        res.article.articleTitle = req.body.articleTitle
    }
    try {
        const updatedArticle = await res.article.save()
        res.json(updatedArticle)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getArticle, async (req, res) => {
    try {
        await res.article.remove()
        res.json({ message: 'Deleted article'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getArticle(req, res, next) {
    let article
    try {
        article = await Article.findById(req.params.id)
        if (article == null){
            return res.status(404).json({ message: 'Cannot find article' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.article = article
    next()
}

module.exports = router