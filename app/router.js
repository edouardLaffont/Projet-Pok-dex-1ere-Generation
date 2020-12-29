const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');

router.use(mainController.initVar);

router.get('/', mainController.homePage);
router.get('/pokemon/:id', mainController.pokemonPage);
router.get('/type', mainController.typePage);
router.get('/type/:id', mainController.pokemonTypePage);

router.use(mainController.notFound);

module.exports = router;