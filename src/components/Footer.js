import React from 'react'
import translate from '../i18n/translate'

const Footer = () => {
  return (
    <div className="footer-section">
      {translate('components.footer.content1')} -
      <a
        href="https://www.getritmo.com/aviso-legal"
        rel="noopener noreferrer"
        className="link"
        target="_blank"
      >
        {translate('components.footer.ahref1')}
      </a>
    </div>
  )
}

export default Footer
