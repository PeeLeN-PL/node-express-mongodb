const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res) => {
  const show = !req.session.vote;
  const quizess = Quiz.find();
  quizess.exec((err, data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.vote
    })
    res.render('quiz', { title: 'quiz', data, sum, show });
  });
});

router.post('/', (req, res) => {
  const id = req.body.quiz;
  const quizItem = Quiz.findOne({
    _id: id
  });
  quizItem.exec((err, data) => {
    ++data.vote;
    data.save((err) => {
      req.session.vote = 1;
      res.redirect('/quiz')
    });
  });
});

module.exports = router;
