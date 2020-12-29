const client = require('./db');

module.exports = {

    getAllPokemon: (callback) => {

        client.query(`SELECT * FROM "pokemon"`, (error, result) => {

            if (error) {
                console.trace(error);
            }

            let data = [];
            if (result) {
                data = result.rows;
            }

            callback(error, data);

        });

    },

    getOnePokemon: (id, callback) => {

        const query = {
            text: `
                SELECT 
                    "pokemon".*, 
                    "type"."id" AS type_id, 
                    "type"."name" AS type_name, 
                    "type"."color" AS type_color 
                
                FROM "pokemon"

                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"
                JOIN "type" ON "type"."id" = "pokemon_type"."type_id"

                WHERE "pokemon"."id" = $1`,
            values: [id]
        };

        client.query(query, (error, result) => {

            if (error) {
                console.trace(error);
            }

            const typeList = [];
            for (const row of result.rows) {
                typeList.push({
                    id: row.type_id,
                    name: row.type_name,
                    color: row.type_color
                });
            }

            let data = [];
            if (result) {
                data = result.rows[0];
                data.typeList = typeList;
            }

            delete data.type_id;
            delete data.type_name;
            delete data.type_color;

            callback(error, data);
        });

    },

    getAllType: (callback) => {

        client.query(`SELECT * FROM "type"`, (error, result) => {

            if (error) {
                console.trace(error);
            }

            let data = [];
            if (result) {
                data = result.rows;
            }

            callback(error, data);

        });

    },

    getPokemonsByType: (id, callback) => {

        const query = {
            text: `
                SELECT 
                    "pokemon".*
                
                FROM "pokemon"

                JOIN "pokemon_type" ON "pokemon_type"."pokemon_numero" = "pokemon"."numero"

                WHERE "pokemon_type"."type_id" = $1`,
            values: [id]
        };

        client.query(query, (error, result) => {

            if (error) {
                console.trace(error);
            }

            callback(error, result.rows);
        });

    }

};