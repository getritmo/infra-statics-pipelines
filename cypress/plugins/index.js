const Login = require('./auth0')

module.exports = (on) => {
  on('task', {
    LoginPuppeteer: Login,
  })
}
