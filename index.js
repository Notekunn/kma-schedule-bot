require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Handler = require('./handlers/');
const handler = new Handler();
const Dish = require('./models/Dish');
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.set('port', process.env.PORT || 3000);
app.set('verify_token', process.env.VERIFY_TOKEN || '');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
mongoose.set('debug', process.env.NODE_ENV == 'development');
mongoose.connection
    .once('open', function () {
        console.log("Connection database success!");
        // handler.emit('setup_page');
    })
    .on('error', function (error) {
        console.log(error.stack);
        process.exit(1);
    });



app.get('/', function (req, res) {
    res.render('index', { app_id: process.env.APP_ID });
})
app.get('/:slug', async function (req, res) {
    const { slug } = req.params;
    const dish = Dish.findOne({ slug });
    if (!dish) return res.send('Món ăn không hợp lệ');
    // res.redirect('')
    res.render('index', { app_id: process.env.APP_ID, dish });
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === app.get('verify_token')) {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

app.post('/webhook/', function (req, res) {
    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(function (entry, i) {
            console.log(`=============== Entry #${i + 1} =============`);
            handler.emit('receive_hook', entry);
        });

        res.status(200).send('HOOK_RECEIVED');

    } else {
        res.sendStatus(404);
    }
})

app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})