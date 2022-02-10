import React from 'react'
import { injectIntl } from 'react-intl'

function Link({ intl, ...props }) {
  const url = intl.formatMessage({
    id: props.id,
  })

  return (
    <a
      href={props.host + url}
      className={props.className}
      target={props.target}
      title={props.title}
      rel={props.rel}
    >
      {props.children}
    </a>
  )
}

export default injectIntl(Link)
