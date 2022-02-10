import React, { Fragment } from 'react'
import translate from '../i18n/translate'

export const OfferComponent = (props) => {
  const texts = {
    Adelanto:
      translate('components.offer_tooltip.text1') +
      '<br/><br/>' +
      translate('components.offer_tooltip.text2'),
    Comisión:
      translate('components.offer_tooltip.text3') +
      translate('components.offer_tooltip.text4') +
      translate('components.offer_tooltip.text5'),
    'Total reembolso': translate('components.offer_tooltip.text6'),
    '% de ventas':
      translate('components.offer_tooltip.text7') +
      '<br/><br/>' +
      translate('components.offer_tooltip.text8') +
      +'<br/><br/>' +
      translate('components.offer_tooltip.text9'),
    'Período devolución':
      translate('components.offer_tooltip.text10') +
      '<br/><br/>' +
      translate('components.offer_tooltip.text11') +
      '<br/><br/>' +
      translate('components.offer_tooltip.text12'),
  }

  return (
    <>
      <div className="offer__tooltip--title">{props.activeTooltip}</div>
      <div
        className="offer__tooltip--text"
        dangerouslySetInnerHTML={{
          __html: texts[props.activeTooltip],
        }}
      />
    </>
  )
}

export default OfferComponent
