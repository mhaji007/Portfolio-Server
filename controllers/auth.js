const jwt = require('express-jwt');
const jwksRa = require('jwks-rsa');
const request = require('request');
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

  exports.getAccessToken = (callback) => {
    const options = {
      method: 'POST',
      url: config.AUTH0_TOKEN_URL,
      headers: {'content-type': 'application/json'},
      form: {
        grant_type: 'client_credentials',
        client_id: config.AUTH0_CLIENT_ID,
        client_secret: config.AUTH0_CLIENT_SECRET,
        audience: config.AUTH0_AUDIENCE
      }
    }
  
    // request(options, (error, res, body) => {
      //if (error) { callback(error)}

      return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
          if (error) {
            return reject(new Error(error))
          }
          resolve(body ? JSON.parse(body) : '')
        })
     // return callback(null, JSON.parse(body));
    })
  }
  exports.getAuth0User = accessToken => userId => {
    const options = {
        method: 'GET',
        url: `${config.AUTH0_DOMAIN}/api/v2/users/${userId}?fields=name,picture,user_id`,
        headers: {authorization: `Bearer ${accessToken}`}
      };
    
      return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
          if (error) {
            return reject(new Error(error))
          }
    
          resolve(body ? JSON.parse(body) : '')
        })
      })
  }