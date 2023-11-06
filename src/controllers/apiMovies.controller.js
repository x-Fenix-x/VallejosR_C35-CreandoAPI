const { getAllMovies, getMovieById } = require('../services/movies.services');

module.exports = {
    index: async (req, res) => {
        try {
            const movies = await getAllMovies();

            return res.status(200).json({
                ok: true,
                data: movies,
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
            const movie = await getMovieById(req.params.id);
            return res.status(200).json({
                ok: true,
                data: movie,
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
    store: (req, res) => {},
    update: (req, res) => {},
    delete: (req, res) => {},
};
