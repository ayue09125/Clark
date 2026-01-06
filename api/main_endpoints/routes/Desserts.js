const express = require('express');
const router = express.Router();
const Desserts = require('../models/Desserts');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;


router.post('/createDessert', (req, res) => {
  const { rating } = req.body;
  const numberSent = !Number.isNaN(Number(rating));
  console.log('Received POST request to createDessert:', req.body);

  const newEvent = new Desserts({
    name: req.body.name,
    description: req.body.description,
    rating: numberSent ? Number(rating) : undefined,
  });

  Desserts.create(newEvent)
    .then((post) => {
      return res.json(post);
    })
    .catch(
      (error) => res.sendStatus(BAD_REQUEST)
    );
});

router.get('/getDesserts', (req, res) => {
  Desserts.find()
    .then(items => res.status(OK).send(items))
    .catch(error => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.post('/editDessert', (req, res) => {
  const {
    name,
    description,
    rating,
    _id,
  } = req.body;
  Desserts.findOne({ _id })
    .then(Desserts => {
      Desserts.name = name || Desserts.name;
      Desserts.description = description || Desserts.description;
      Desserts.rating = rating || Desserts.rating;
      Desserts
        .save()
        .then(() => {
          res.sendStatus(OK);
        })
        .catch(() => {
          res.sendStatus(BAD_REQUEST);
        });
    })
    .catch(() => {
      res.sendStatus(NOT_FOUND);
    });
});

router.post('/deleteDessert', (req, res) => {
  Desserts.deleteOne({ _id: req.body._id })
    .then(result => {
      if (result.n < 1) {
        res.sendStatus(NOT_FOUND);
      } else {
        res.sendStatus(OK);
      }
    })
    .catch(() => {
      res.sendStatus(BAD_REQUEST);
    });
});

module.exports = router;