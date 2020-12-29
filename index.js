require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

const router = require('./app/router');
app.use(router);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});