const puppeteer = require('puppeteer')

module.exports = async function Login(options = {}) {
  console.log('Launching browser....')
  const browser = await puppeteer.launch({
    headless: options.headless,
    args: options.args || ['--disable-dev-shm-usage'],
  })

  const page = await browser.newPage()
  try {
    await page.setViewport({ width: 1280, height: 800 })
    await page.setRequestInterception(true)
    page.on('request', preventApplicationRedirect(options.callbackUrl))

    await page.goto(options.loginUrl, { waitUntil: 'networkidle0' })
    // await page.waitForTimeout(500)

    // Enter credentials.
    console.log('Entering credentials....')
    await writeEmail({ page, options })
    await writePassword({ page, options })

    // The press login.
    console.log('Press on login....')
    const response = await clickLogin({ page, options })
    console.log('Response status: ', response.status)

    // The login failed.
    if (response.status() >= 400) {
      throw new Error(
        `'Login with user ${options.email} failed, error ${response.status()}`,
      )
    }

    // Redirected to MFA/consent/... which is not implemented yet.
    const url = response.url()
    if (url.indexOf(options.callbackUrl) !== 0) {
      throw new Error(`User was redirected to unexpected location: ${url}`)
    }

    // Now let's fetch all cookies.
    const { cookies } = await page._client.send('Network.getAllCookies', {})
    return {
      callbackUrl: url,
      cookies,
    }
  } finally {
    await page.close()
    await browser.close()
  }
}

async function writeEmail({ page, options } = {}) {
  console.log('Email: ', options.email)
  await page.waitForSelector('input[name=email]', { visible: true })
  await page.screenshot({ path: 'exampleBeforeEmail.png' })
  await page.type('input[name=email]', options.email)
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'exampleAfterEmail.png' })
}

async function writePassword({ page, options } = {}) {
  console.log('Password: ', options.password)
  await page.waitForSelector('input[type=password]', { visible: true })
  await page.type('input[type=password]', options.password)
  await page.waitForTimeout(300)
}

async function clickLogin({ page } = {}) {
  await page.screenshot({ path: 'exampleBefore.png' })
  await page.waitForSelector('button[name=submit]', {
    visible: true,
    timeout: 5000,
  })
  await page.click('button[name=submit]')
  await page.screenshot({ path: 'exampleAfter.png' })
  const response = await page.waitForNavigation({ waitUntil: 'networkidle2' })
  await page.screenshot({ path: 'exampleLogged.png' })
  // const [response] = await Promise.all([
  //   page.waitForNavigation({ waitUntil: 'networkidle2' }),
  //   page.click('button[name=submit]'),
  // ])
  return response
}

function preventApplicationRedirect(callbackUrl) {
  return (request) => {
    const url = request.url()
    if (request.isNavigationRequest() && url.indexOf(callbackUrl) === 0)
      request.respond({ body: url, status: 200 })
    else request.continue()
  }
}
