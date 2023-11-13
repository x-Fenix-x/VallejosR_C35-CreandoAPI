const db = require('../database/models');

const getAllGenres = async (limit, offset) => {
    try {
        const genres = await db.Genre.findAll({
            limit,
            offset,
            attributes: {
                exclude: ['created_at', 'updated_at', 'genre_id'],
            },
        });
        const count = await db.Genre.count();
        return {
            genres,
            count,
        };
    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error en el servicio',
        };
    }
};

const getGenreById = async (id) => {
    try {
        if (!id) {
            throw {
                status: 400,
                message: 'ID inexistente',
            };
        }

        const genre = await db.Genre.findByPk(id, {
            attributes: {
                exclude: ['created_at', 'updated_at'],
            },
        });

        if (!genre) {
            throw {
                status: 404,
                message: 'No hay género con ese ID',
            };
        }

        return genre;
    } catch (error) {
        console.log(error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error en el servicio',
        };
    }
};

module.exports = {
    getAllGenres,
    getGenreById,
};
