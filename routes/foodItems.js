const router = require('express').Router();
let FoodItem = require('../db/models/foodItem.model');

router.route('/').get((req, res) => {
    FoodItem.find()
      .then(foodItems => res.json(foodItems))
      .catch(err => res.setMaxListeners(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const calories = req.body.calories;
    const date = Date.parse(req.body.date);

    const newFoodItem = new FoodItem({
        name,
        calories,
        date,
    });

    newFoodItem.save()
      .then(() => res.json('FoodItem added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    FoodItem.findById(req.params.id)
      .then(foodItem => res.json(foodItem))
      .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').delete((req, res) => {
    FoodItem.findByIdAndDelete(req.params.id)
      .then(() => res.json('foodItem deleted'))
      .catch(err => res.status(400).json('Error :' + err));
});

router.route('/update/:id').post((req, res) => {
    FoodItem.findById(req.params.id)
      .then(foodItem => {
          foodItem.name = req.body.name;
          foodItem.calories = req.body.calories;
          exercise.date = Date.parse(req.body.date);

          foodItem.save()
            .then(() => res.json('foodItem updated!'))
            .catch(err => res.status(400).json('Error : ' + err));
      })
      .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;