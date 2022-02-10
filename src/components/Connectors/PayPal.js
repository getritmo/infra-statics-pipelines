import React, { Fragment } from 'react'
import FaqInfo from './FaqInfo'
import translate from '../../i18n/translate'
import Image from '../../i18n/image'
import Link from '../../i18n/link'
import useAsyncActions from 'hooks/useAsyncActions'

const PayPal = (props) => {
  const { startsConnection } = useAsyncActions()
  const host = process.env.REACT_APP_API_URL
  const panelAccount = props.panelAccount

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">{translate('components.paypal.header')}</h2>

      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          {panelAccount.name === undefined && (
            <>
              <p>{translate('components.paypal.content1')}</p>
              <ul>
                <li>{translate('components.paypal.content2')}</li>
                <li>{translate('components.paypal.content3')}</li>
                <li>{translate('components.paypal.content4')}</li>
              </ul>
              <p>
                <a
                  href="https://www.paypal.com/es/smarthelp/article/how-do-i-add-users-to-my-paypal-account-faq1605"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link__full"
                >
                  {translate('components.paypal.ahref1')}
                </a>{' '}
                {translate('components.paypal.content5')}
              </p>
              <div>
                {translate('components.paypal.content6')}
                <ol>
                  <li>{translate('components.paypal.content7')}</li>
                  <li>{translate('components.paypal.content8')}</li>
                  <li>
                    {translate('components.paypal.content9')}
                    <br />
                    <br />
                    <Link
                      id="components.paypal.image1"
                      host={host}
                      className="panel__images"
                      title={translate('common.enlarge')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image id="components.paypal.image1" />
                    </Link>
                    <br />
                  </li>
                  <li>
                    {translate('components.paypal.content10')}
                    <br />
                    <br />

                    <Link
                      id="components.paypal.image2"
                      host={host}
                      className="panel__images"
                      title={translate('common.enlarge')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image id="components.paypal.image2" />
                    </Link>
                    <br />
                  </li>
                  <li>
                    {translate('components.paypal.content11')}
                    <br />
                    <br />
                    <Link
                      id="components.paypal.image3"
                      host={host}
                      className="panel__images"
                      title={translate('common.enlarge')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image id="components.paypal.image3" />
                    </Link>
                    <br />
                  </li>
                  <li>
                    {translate('components.paypal.content12')}
                    <ul>
                      <li>{translate('components.paypal.content13')}</li>
                      <li>{translate('components.paypal.content14')}</li>
                      <li>{translate('components.paypal.content15')}</li>
                    </ul>
                    <br />
                  </li>

                  <li>
                    {translate('components.paypal.content16')}
                    <br />
                    <br />
                    <Link
                      id="components.paypal.image4"
                      host={host}
                      className="panel__images"
                      title={translate('common.enlarge')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image id="components.paypal.image4" />
                    </Link>
                  </li>
                </ol>
              </div>
            </>
          )}

          {panelAccount.name !== undefined && (
            <>
              <h2 className="panel__content--success">
                {translate('components.paypal.account_connected', {
                  account: panelAccount.name,
                })}
              </h2>

              <div className="panel__img--container" />

              <br />
              <div className="panel__content--text">
                {translate('components.paypal.content_1')}
              </div>

              <button
                className="link link__full link__add"
                onClick={(e) => {
                  startsConnection(e, { connector: 'paypal' })
                }}
              >
                <span>{translate('components.paypal.content_2')}</span>
              </button>
            </>
          )}
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default PayPal
