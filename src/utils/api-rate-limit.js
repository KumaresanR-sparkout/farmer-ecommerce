import { rateLimit } from 'express-rate-limit'

export const apiRateLimit = () => {
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000,
        limit: 20,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: 'server overloaded due to many request from single-user'
    })
    return limiter
}