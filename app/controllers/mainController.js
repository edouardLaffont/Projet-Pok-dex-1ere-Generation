const dataMapper = require('../dataMapper');

module.exports = {

    initVar: (_, response, next) => {
        response.locals.pageTitle = 'Pokedex, attrapez-les tous !!'; response.locals.pageDescription = `Un pokédex, est une sorte de dictionnaire de tous les pokémon (petites créatures fictives et adorables). Ces derniers peuvent se battre
        et disposent de caractéristiques de combat appelées statistiques. Chaque pokémon possède aussi un ou deux types (plante, roche, feu...).`;
        next();
    },

    homePage: (_, response) => {
        dataMapper.getAllPokemon((error, pokemonList) => {
            if (error) {
                response.status(500).render('error', { error: 500, message: 'Une erreur est survenue, merci de réessayer ultérieurement' });
                return;
            }

            response.render('list', { pokemonList });
        });
    },

    pokemonPage: (request, response, next) => {

        const id = Number(request.params.id);

        dataMapper.getOnePokemon(id, (error, pokemon) => {
            if (error) {
                response.status(500).render('error', { error: 500, message: 'Une erreur est survenue, merci de réessayer ultérieurement' });
                return;
            }

            response.render('detail', { pokemon });
        });
    },

    typePage: (request, response, next) => {

        dataMapper.getAllType((error, typeList) => {
            if (error) {
                response.status(500).render('error', { error: 500, message: 'Une erreur est survenue, merci de réessayer ultérieurement' });
                return;
            }

            response.render('type', { typeList });
        });
    },

    pokemonTypePage: (request, response, next) => {

        const id = Number(request.params.id);

        dataMapper.getPokemonsByType(id, (error, pokemonList) => {
            if (error) {
                response.status(500).render('error', { error: 500, message: 'Une erreur est survenue, merci de réessayer ultérieurement' });
                return;
            }

            response.render('list', { pokemonList });
        });
    },

    notFound: (_, response) => {
        response.status(404).render('error', {error: 404, message: 'Game over !!'});
    }

};