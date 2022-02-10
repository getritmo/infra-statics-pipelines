import React, { useContext } from 'react'
import FaqInfo from './FaqInfo'
import translate from '../../i18n/translate'
import PanelLastSync from './../PanelLastSync'
import { RutterContext } from 'context/RutterContext'
import useAsyncActions from 'hooks/useAsyncActions'

const Shopify = (props) => {
  const { startsConnection } = useAsyncActions()
  const { openRutter } = useContext(RutterContext)

  const panelAccount = props.panelAccount

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">{translate('components.shopify.header')}</h2>
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <h2 className="panel__content--success">
            {translate('components.shopify.shop_connected', {
              shop: panelAccount.name,
            })}
          </h2>
          <PanelLastSync panelAccount={panelAccount} />

          <div className="panel__img--container" />

          <div className="panel__content--text">
            {translate('components.shopify.content1')}
          </div>

          <button
            className="link link__full link__add"
            onClick={(e) => {
              props.closePanel()
              startsConnection(e, { connector: 'shopify' }, openRutter)
            }}
          >
            <span>{translate('components.shopify.content2')}</span>
          </button>
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default Shopify
