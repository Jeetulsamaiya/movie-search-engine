var express = require('express');
var router = express.Router();
var db = require('./users')

/* GET home page. */
router.get('/', function (req, res) {
  db.find().then(function (allmovies) {
    res.render('index', {
      allmovies: allmovies
    })
  })
})

router.get('/create', function (req, res) {
  res.render('create')
})

router.post('/createe', function (req, res) {
  db.create({
    name: req.body.name,
    imbd: req.body.imbd,
    img: req.body.img,
    details: req.body.details
  }).then(function (created) {
    res.redirect("/")
  })
})

router.get('/read/:id', function (req, res) {
  db.findOne({
    _id: req.params.id,
  }).then(function (data) {
    res.render('read', {
      data
    })
  })
})
router.get('/delete/:id', function (req, res) {
  db.findOneAndDelete({
    _id: req.params.id,
  }).then(function (deleted) {
    res.redirect('/')
  })
})


router.get('/search', function (req, res) {
  res.render('search')
})


router.get('/search/:plc', function (req, res) {
  var param = req.params.plc
  const regex = new RegExp(`^${param}`, "i")
  db.find({
    name: {
      $regex: regex,
    }
  }).then(function (data) {
    res.json(data)
  })
})


router.get('/update/:id', function (req, res) {
  db.findOne({
    _id: req.params.id,
  }).then(function (data) {
    res.render("update", {
      data
    })
  })
})


router.post('/updatee/:id', function (req, res) {
  db.findOneAndUpdate({
    _id: req.params.id,
  }, {
    name: req.body.name,
    imbd: req.body.imbd,
    img: req.body.img,
    details: req.body.details
  }).then(function (data) {
    res.redirect("/")
  })
})
module.exports = router;