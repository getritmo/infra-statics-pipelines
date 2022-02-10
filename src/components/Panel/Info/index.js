import translate from 'i18n/translate'
import React from 'react'

const InfoContent = ({ subtype }) => {
  const PrivacyContent = () => (
    <div className="privacy-text">
      {translate('components.panel.info.privacy.content', {
        link: (
          <a
            href="https://www.getritmo.com/en/politica-de-privacidad/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link__full"
          >
            DGPR
          </a>
        ),
      })}
    </div>
  )

  switch (subtype) {
    case 'privacy':
      return <PrivacyContent />
    default:
      return null
  }
}

export default InfoContent
