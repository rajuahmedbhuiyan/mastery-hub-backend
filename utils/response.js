
const handleSendResponse = ({res, statusCode = 200, message, data}) => {
    return res.status(statusCode).json({
        message,
        value: data,
        statusCode
    });
}

module.exports = {
    handleSendResponse
}