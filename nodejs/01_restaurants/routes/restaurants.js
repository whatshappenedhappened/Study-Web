const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/confirm', function(req, res) {
    res.render('confirm');
});

router.get('/recommend', function(req, res) {
    res.render('recommend');
});

router.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const storedRestaurant = resData.getStoredRestaurants();

    storedRestaurant.push(restaurant);

    resData.storeRestaurants(storedRestaurant);

    res.redirect('/confirm');
})

router.get('/restaurants', function(req, res) {
    let order = req.query.order;
    let nextOrder = 'desc';

    console.log(order + `   ${typeof(order)}`);
    
    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }
    
    if (order === 'desc') {
        nextOrder = 'asc';
    }
    
    const storedRestaurant = resData.getStoredRestaurants();

    storedRestaurant.sort(function (resA, resB) {
        if (
            (order === 'asc' && resA.name > resB.name) ||
            (order === 'desc' && resB.name > resA.name)
        ) {
            return 1;
        }
        return -1;
    });

    res.render('restaurants', {
        restaurantAmount : storedRestaurant.length,
        restaurants : storedRestaurant,
        nextOrder : nextOrder
    });
});

router.get('/restaurants/:id', function(req, res) {
    const storedRestaurant = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurant) {
        if (restaurant.id === req.params.id) {
            return res.render('restaurants-detail', { rid : req.params.id, 
                                                restaurant : restaurant });
        }
    }

    res.status(404).render('404');
})

module.exports = router;