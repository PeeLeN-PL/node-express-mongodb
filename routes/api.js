const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
    const search = req.query.search || '';
    const sort = req.query.sort && req.query.sort != -1 ? 1 : -1;
    const findNews = News
        .find({
            title: new RegExp(search.trim(), 'i')
        })
        .sort({
            created: sort
        }).select('title description')
        ;

    findNews.exec((err, data) => {
        res.json(data);
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const findNews = News.findById({
        _id: id
    }).select('title description');

    findNews.exec((err, data) => {
        res.json(data);
    })
});

module.exports = router;
