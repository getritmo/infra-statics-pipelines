import React, { useContext } from 'react'
import translate from '../../i18n/translate'
import FaqInfo from './FaqInfo'
import PanelLastSync from '../PanelLastSync'
import { RutterContext } from 'context/RutterContext'
import useAsyncActions from 'hooks/useAsyncActions'

const AmazonSeller = (props) => {
  const { startsConnection } = useAsyncActions()
  const { openRutter } = useContext(RutterContext)
  const panelAccount = props.panelAccount

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.amazon_seller.header')}
      </h2>

      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <h2 className="panel__content--success">
            {translate('components.amazon_seller.shop_connected', {
              shop: panelAccount.name,
            })}
          </h2>
          <PanelLastSync panelAccount={panelAccount} />
          <div className="panel__img--container" />

          <br />
          <div className="panel__content--text">
            {translate('components.amazon_seller.content1')}
          </div>

          <button
            className="link link__full link__add"
            onClick={(e) => {
              props.closePanel()
              startsConnection(e, { connector: 'amazonseller' }, openRutter)
            }}
          >
            <span>{translate('components.amazon_seller.content2')}</span>
          </button>
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default AmazonSeller
