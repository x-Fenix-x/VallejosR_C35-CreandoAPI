const paginate = require('express-paginate');
const createError = require('http-errors');
const {
    getAllMovies,
    getMovieById,
    storeMovie,
    updateMovie,
    deleteMovie,
} = require('../services/movies.services');

module.exports = {
    index: async (req, res) => {
        try {
            const { count, movies } = await getAllMovies(
                req.query.limit,
                req.skip
            );
            const pagesCount = Math.ceil(count / req.query.limit); // cuantas páginas voy a obtener.
            const currentPage = req.query.page; // cual es la página actual
            const pages = paginate.getArrayPages(req)(
                pagesCount,
                pagesCount,
                currentPage
            ); // crear array de páginas

            return res.status(200).json({
                ok: true,
                meta: {
                    pagesCount,
                    currentPage,
                    pages,
                },
                data: movies.map((movie) => {
                    return {
                        ...movie.dataValues,
                        url: `${req.protocol}://${req.get(
                            'host'
                        )}/api/v1/movies/${movie.id}`,
                    };
                }),
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
    store: async (req, res) => {
        try {
            const {
                title,
                rating,
                release_date,
                awards,
                length,
                genre_id,
                actors,
            } = req.body;

            if (
                [title, rating, release_date, awards].includes('' || undefined)
            ) {
                throw createError(400, 'Todos los campos son obligatorios');
            }

            const movie = await storeMovie(req.body, actors);
            return res.status(200).json({
                ok: true,
                message: 'Película agregada con éxito',
                url: `${req.protocol}://${req.get('host')}/api/v1/movies/${
                    movie.id
                }`,
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

    update: async (req, res) => {
        try {
            const movieUpdated = await updateMovie(req.params.id, req.body);
            return res.status(200).json({
                ok: true,
                message: 'Película actualizada con éxito',
                data: movieUpdated,
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
    delete: async (req, res) => {
        try {
            await deleteMovie(req.params.id);

            return res.status(200).json({
                ok: true,
                message: 'Película eliminada con éxito',
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
