


import rateLimit from "express-rate-limit";


export const bidLimiter=rateLimit({
    windowMs:1000,
    max:5,
    message:{
        status:429,
        message:"Too many bids! slow down"
    },
  standardHeaders: true, 
  legacyHeaders: false,

})


export const aucitonLimiter=rateLimit({
    windowMs:1000,
    max:5,
    message:{
        status:429,
        message:"Too many Auction! slow down"
    },
    standardHeaders: true, 
    legacyHeaders: false,
})


