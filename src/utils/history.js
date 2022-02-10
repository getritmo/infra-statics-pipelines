import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

history.listen(() => {
  if (localStorage.getItem('preventSend') === null) {
    if (window.ga) {
      window.ga('send', 'pageview', {
        page: window.location.pathname,
      })
    }
  } else {
    localStorage.clear()
  }
})

export default history
