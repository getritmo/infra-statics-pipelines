import React from 'react'
import translate from '../../i18n/translate'

const FaqInfo = () => {
  const closeItemsClick = (e) => {
    const id = e.target.getAttribute('for')
    const input = document.getElementById(id)
    const scrollerP = document.querySelector('.panel__content--scroll')

    if (input !== null && !input.checked && window.innerWidth > 768) {
      setTimeout(() => {
        scrollerP.scrollTop = scrollerP.scrollHeight
      }, 300)
    }

    if (input !== null && input.checked) {
      setTimeout(() => {
        input.checked = false
      }, 100)
    }
  }

  return (
    <div className="panel__content--faq">
      <div className="panel__content--faq--item">
        <input
          id="faq_1"
          type="radio"
          name="radio1"
          className="panel__content--faq--accordion"
        />
        <label htmlFor="faq_1" onClick={closeItemsClick} className="link">
          {translate('components.faq_info.title1')}
        </label>
        <div className="panel__content--faq--response response">
          {translate('components.faq_info.response1')}{' '}
          <a
            href="https://www.getritmo.com/politica-de-privacidad/"
            rel="noopener noreferrer"
            target="_blank"
            className="link link__full"
          >
            {translate('components.faq_info.ahref1')}
          </a>{' '}
          {translate('components.faq_info.response2')}
        </div>
      </div>
      <div className="panel__content--faq--item">
        <input
          id="faq_2"
          type="radio"
          name="radio1"
          className="panel__content--faq--accordion"
        />
        <label htmlFor="faq_2" className="link" onClick={closeItemsClick}>
          {translate('components.faq_info.title2')}
        </label>
        <div className="panel__content--faq--response response">
          {translate('components.faq_info.response3')}{' '}
          <a
            href="https://www.getritmo.com/politica-de-privacidad/"
            rel="noopener noreferrer"
            target="_blank"
            className="link link__full"
          >
            {translate('components.faq_info.ahref1')}
          </a>{' '}
          {translate('components.faq_info.response4')}
        </div>
      </div>
      <div className="panel__content--faq--item">
        <input
          id="faq_3"
          type="radio"
          name="radio1"
          className="panel__content--faq--accordion"
        />
        <label htmlFor="faq_3" className="link" onClick={closeItemsClick}>
          {translate('components.faq_info.title3')}
        </label>
        <div className="panel__content--faq--response response">
          {translate('components.faq_info.response5')}{' '}
          <a
            href="https://www.getritmo.com/politica-de-privacidad/"
            rel="noopener noreferrer"
            target="_blank"
            className="link link__full"
          >
            {translate('components.faq_info.ahref1')}
          </a>{' '}
          {translate('components.faq_info.response6')}
        </div>
      </div>
    </div>
  )
}

export default FaqInfo
