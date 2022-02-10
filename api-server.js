const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
// const authConfig = require('./src/auth_config.json')

const app = express()

const port = process.env.API_PORT || 3001
const appPort = process.env.SERVER_PORT || 3000
const appOrigin = process.env.REACT_APP_API_URL || `http://localhost:${appPort}`

/* if (!process.env.REACT_APP_AUTH0_DOMAIN || !process.env.REACT_APP_AUTH0_AUDIENCE) {
  throw new Error(
    "Please make sure that auth_config.json is in place and populated"
  );
} */

app.use(morgan('dev'))
app.use(helmet())
app.use(cors({ origin: appOrigin }))

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!',
  })
})

app.listen(port, () => console.log(`API Server listening on port ${port}`))
