export const sendSuccess = (res, statusCode, message, data) => {
    const response = {
        "statusCode": statusCode,
        "status": true,
        "message": message,
        "data": data
    }
    res.status(statusCode).json(response)
}


export const sendError = (res, statusCode, message) => {
    const response = {
        "statusCode": statusCode,
        "status": false,
        "message": message
    }
    res.status(statusCode).json(response)
}