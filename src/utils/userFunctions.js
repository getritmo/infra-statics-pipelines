export const serverHost = process.env.REACT_APP_SERVER_URL

export const decode = (status) => {
  const res = []
  const maxLevels = Math.round(Math.log2(status))
  for (let i = maxLevels; i >= 0; i--) {
    // eslint-disable-next-line
    if ((status >> i) & (1 === 1)) {
      res.push(i)
    }
  }
  return res
}

export const inArray = (string, value) => {
  return string.indexOf(value) !== -1
}

export const clickMenu = (value) => {
  const menuItem = document.querySelector('a[href="' + value + '"]')

  if (menuItem != null) {
    menuItem.click()
  }
}

export default decode
