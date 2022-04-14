const notFoundStatus = 404;

const notFoundResponse = (request, response) => {
    console.log("[error]: Error 404 - not found")

    response.status(notFoundStatus).json({
        error: 'Not found'
    })
}

module.exports = notFoundResponse