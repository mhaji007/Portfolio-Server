const jwt = require('express-jwt');
const jwksRa = require('jwks-rsa');
const config = require('../config/dev');

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
// middleware to check for admin rights
exports.checkRole = role => (req, res, next) => {
    const user = req.user;
  
    if (user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)) {
      next();
    } else {
      return res.status(401).send('You are not authorized to access this resource!')
    }
  }