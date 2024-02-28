const express = require('express'); // express 모듈 반환
const app = express();              // express 애플리케이션 객체 반환 (즉, 생성)

// app.use(express.urlencoded({extended: false}));

app.get('/currenttime', function(req, res) {
    res.send(`<h1>${new Date().toISOString()}</h1>`);
});

app.get('/', function(req, res) {
    res.send('<form action="/store-user" method="POST"><label>Your Name</label><input type="text" name="username"><button>Submit</button></form>');
});

app.post('/store-user', function(req, res) {
    const userName = req.body.username;
    console.log(userName);
    console.dir(req);
    console.dir(req.body);

    res.send(`<h1>Username stored!</h1>`)
});

app.listen(3000);