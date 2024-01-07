const db = require('../database/models');
const { getAllGenres, getGenreById } = require('../services/genres.services');

module.exports = {
    index: async (req, res) => {
        try {
            const { genres } = await getAllGenres();

            return res.status(200).json({
                ok: true,
                meta: {
                    total: genres.length,
                },
                data: genres,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Error en el servidor',
            });
        }
    },

    show: async (req, res) => {
        try {
            const genre = await getGenreById(req.params.id);
            return res.status(200).json({
                ok: true,
                data: genre,
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                status: error.status || 500,
                error: error.message || 'Error en el servidor',
            });
        }
    },
};
