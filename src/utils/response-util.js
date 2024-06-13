export const sendSuccess = (res, statusCode, message, data) => {
    const response = {
        "status_code": statusCode,
        "status": true,
        "message": message,
        "data": data
    }
    res.status(statusCode).json(response)
}


export const sendError = (res, statusCode, message) => {
    const response = {
        "status_code": statusCode,
        "status": false,
        "message": message
    }
    res.status(statusCode).json(response)
}