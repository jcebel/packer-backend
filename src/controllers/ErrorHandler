const internalServerError = (error, res) => {
    console.log(new Date(), error);
    return res.status(500).json({
        error: 'Internal server error',
        message: error.message
    })
};

module.exports = {
    internalServerError
};