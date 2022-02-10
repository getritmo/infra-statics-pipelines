import React from 'react'
import translate from '../../i18n/translate'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'
import PanelLastSync from '../PanelLastSync'
import { useDispatch } from 'react-redux'
import { setOverlay } from 'actions/global'
const MercadoLibre = ({ panelAccount, closePanel }) => {
  const dispatch = useDispatch()

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.mercado_libre.header')}
      </h2>
      {panelAccount.name === undefined ? (
        <div className="panel__content--scroll">
          <div className="panel__content--scroll--content">
            <DefaultContent closePanel={closePanel} />
          </div>
          <FaqInfo />
        </div>
      ) : (
        <div className="panel__content--scroll">
          <div className="panel__content--scroll--content">
            <h2 className="panel__content--success">
              {translate('components.mercado_libre.account_connected', {
                account: panelAccount.name ? panelAccount.name : '',
              })}
            </h2>
            <PanelLastSync panelAccount={panelAccount} />

            <div className="panel__img--container" />

            <br />
            <div className="panel__content--text">
              {translate('components.mercado_libre.content1')}
            </div>

            <button
              className="link link__full link__add"
              onClick={() => {
                dispatch(
                  setOverlay({
                    open: true,
                    type: 'ML-MP',
                    connector: 'mercadolibre',
                  }),
                )
              }}
            >
              <span>{translate('components.mercado_libre.content2')}</span>
            </button>
          </div>
          <FaqInfo />
        </div>
      )}
    </div>
  )
}

export default MercadoLibre
