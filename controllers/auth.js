const jwt = require('express-jwt');
const jwksRa = require('jwks-rsa');

// Authentication middleware
// Checks access token in 
// authorization headers of
// a request
// Verifies access token
// against Auth0 JSON web key

exports.checkJwt = jwt({
    secret: jwksRa.expressJwtSecret({
        cache: true,
        rateLimit:true,
        jwksRequestPerMinute:  10,
        jwksUri:'https://mhaji007.auth0.com/.well-known/jwks.json'
    }),
    audience:'https://mhaji007.auth0.com/api/v2/',
    issuer:'https://mhaji007.auth0.com/',
    algorithms:['RS256']
});