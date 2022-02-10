import React from 'react'
import translate from '../../../i18n/translate'

const SessionsInfo = () => {
  return (
    <p>
      {translate('components.sessions_info.p1')}
      <br />
      <br />
      {translate('components.sessions_info.p2')}
      <br />
      {translate('components.sessions_info.p3')}
    </p>
  )
}

export default SessionsInfo
