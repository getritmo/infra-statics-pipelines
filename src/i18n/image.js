import React from 'react'
import { injectIntl } from 'react-intl'

function Image({ intl, ...props }) {
  const host = process.env.REACT_APP_API_URL
  const image = intl.formatMessage({
    id: props.id,
  })

  return <img src={host + image} alt="" />
}

export default injectIntl(Image)
