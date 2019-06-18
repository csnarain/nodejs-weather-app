function logger (req, res, next){
    console.log('Authentication in progress....');
    next();
}

module.exports = logger;