import React from 'react'
import translate from '../../i18n/translate'
import FaqInfo from './FaqInfo'
import PanelLastSync from '../PanelLastSync'
import useAsyncActions from 'hooks/useAsyncActions'

const Stripe = ({ panelAccount }) => {
  const { startsConnection } = useAsyncActions()

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">{translate('components.stripe.header')}</h2>
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <h2 className="panel__content--success">
            {translate('components.stripe.account_connected', {
              account: panelAccount.name,
            })}
          </h2>
          <PanelLastSync panelAccount={panelAccount} />

          <div className="panel__img--container" />

          <br />
          <div className="panel__content--text">
            {translate('components.stripe.content1')}
          </div>

          <button
            className="link link__full link__add"
            onClick={(e) => {
              startsConnection(e, { connector: 'stripe' })
            }}
          >
            <span>{translate('components.stripe.content2')}</span>
          </button>
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default Stripe
