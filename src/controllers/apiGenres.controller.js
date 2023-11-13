const { getGenreById, getAllGenres } = require('../services/genres.services');
const paginate = require('express-paginate');

module.exports = {
    index: async (req, res) => {
        try {
            const { count, genres } = await getAllGenres(
                req.query.limit,
                req.skip
            );
            const pagesCount = Math.ceil(count / req.query.limit);
            const currentPage = req.query.page;
            const pages = paginate.getArrayPages(req)(
                pagesCount,
                pagesCount,
                currentPage
            );

            return res.status(200).json({
                ok: true,
                meta: {
                    pagesCount,
                    currentPage,
                    pages,
                },
                data: genres.map((genre) => {
                    return {
                        ...genre.dataValues,
                        url: `${req.protocol}://${req.get(
                            'host'
                        )}/api/v1/genres/${genre.id}`,
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
