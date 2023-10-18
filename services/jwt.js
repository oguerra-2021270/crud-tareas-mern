'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const key = '0d0a546f705f7365637265745f6b6579';

exports.createToken = (user) => {
    var payload = {
        
        iat: moment().unix(),
        exp: moment().add(30, "minutes").unix()
    }
    return jwt.encode(payload, key);
}