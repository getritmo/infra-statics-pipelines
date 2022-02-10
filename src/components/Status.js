import React, { Fragment } from 'react'
import translate from '../i18n/translate'

export const Status = (props) => {
  return (
    <>
      {translate('components.status')} <span>{props.statusText}</span>
    </>
  )
}

export default Status
