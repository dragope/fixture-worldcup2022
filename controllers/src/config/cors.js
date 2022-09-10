const whitelist = ['http://localhost:3000']

const corsOptions = {
    origin: function (origin, callback){
        if(whitelist.indexOf != -1){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = { corsOptions }