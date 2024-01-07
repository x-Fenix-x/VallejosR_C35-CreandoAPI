const db = require('../database/models');

const getAllGenres = async () => {
    try {
        const genres = await db.Genre.findAll({
            order: [['name', 'ASC']],
        });
        return {
            genres,
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
