//@description  Sending success response function
export const sendSuccess = (res, statusCode, message, data) => {
    const response = {
        "statusCode": statusCode,
        "status": true,
        "message": message,
        "data": data
    }
    res.status(statusCode).json(response)
}

//@description  sending error response function
export const sendError = (res, statusCode, message) => {
    const response = {
        "statusCode": statusCode,
        "status": false,
        "message": message
    }
    res.status(statusCode).json(response)
}