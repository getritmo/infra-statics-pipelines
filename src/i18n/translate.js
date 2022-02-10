import InsightsIcon from 'components/UI/Icons/InsightsIcon'
import React from 'react'
import { FormattedMessage } from 'react-intl'

const translate = (id, value = {}) => (
  <FormattedMessage
    id={id}
    values={{
      ...value,
      // This value allows to show bold text directly from translations. Any special
      // rich text property should be specified here.
      b: (text) => <b>{text}</b>,
      p: (text) => <p>{text}</p>,
      label: (text) => <label>{text}</label>,
      li: (text) => <li>{text}</li>,
      ul: (text) => <ul>{text}</ul>,
      em: (text) => <em>{text}</em>,
      h3: (text) => <h3>{text}</h3>,
      span: (text) => <span>{text}</span>,
      br: <br />,
      br_mobile: <br className="mobile-visible" />,
      br_desktop: <br className="desktop-visible" />,
      ri: (
        <b>
          RITMO Insights
          <InsightsIcon classes="ritmo-insights-icon" width={14} height={14} />
        </b>
      ),
      strong: (text) => <strong>{text}</strong>,
    }}
  />
)

export default translate
