const fs = require('fs');
const path = require('path');

const express = require('express');
const uuid = require('uuid');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended : false}));

app.get('/', function(req, res) {
    res.render('index');    // 확장자 생략 가능
});

app.get('/about', function(req, res) {
    res.render('about');    // 확장자 생략 가능
});

app.get('/confirm', function(req, res) {
    res.render('confirm');
});

app.get('/recommend', function(req, res) {
    res.render('recommend');
});

app.post('/recommend', function(req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);

    storedRestaurant.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurant));

    res.redirect('/confirm');
})

app.get('/restaurants', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);

    res.render('restaurants', { restaurantAmount : storedRestaurant.length,
                                restaurants : storedRestaurant});
});

app.get('/restaurants/:id', function(req, res) {
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurant = JSON.parse(fileData);

    for (const restaurant of storedRestaurant) {
        if (restaurant.id === req.params.id) {
            return res.render('restaurants-detail', { rid : req.params.id, 
                                                restaurant : restaurant });
        }
    }

    res.render('404');
})

app.use(function(req, res) {
    res.render('404');
});

app.use(function(error, req, res, next) {
    res.render('500');
})

app.listen(3000);