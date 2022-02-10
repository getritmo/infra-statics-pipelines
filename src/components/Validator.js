import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import translate from '../i18n/translate'
import { inArray, decode } from '../utils/userFunctions'

export const Validator = (props) => {
  const updateMenu = (e) => {
    e.preventDefault()
    const url = e.target.getAttribute('href')
    document
      .querySelector('.menu-column__section a[href="' + url + '"]')
      .click()
  }

  return (
    <>
      {props.status.status && (
        <div className="validator">
          {!inArray(decode(props.status.status), 3) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/marketing-accounts"
                onClick={updateMenu}
              >
                {translate('common.marketing_accounts')}
              </Link>
            </div>
          )}
          {!inArray(decode(props.status.status), 4) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/sales-accounts"
                onClick={updateMenu}
              >
                {translate('common.sales_accounts')}
              </Link>
            </div>
          )}
          {!inArray(decode(props.status.status), 5) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/finance-accounts"
                onClick={updateMenu}
              >
                {translate('common.finance_accounts')}
              </Link>
            </div>
          )}
          {!inArray(decode(props.status.status), 6) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/company-details"
                onClick={updateMenu}
              >
                {translate('components.validator.company_details')}
              </Link>
            </div>
          )}
          {props.actual > 7 && !inArray(decode(props.status.status), 7) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/offer"
                onClick={updateMenu}
              >
                {translate('components.validator.offer')}
              </Link>
            </div>
          )}
          {props.actual > 8 && !inArray(decode(props.status.status), 8) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/contract-signal"
                onClick={updateMenu}
              >
                {translate('components.validator.contract_signal')}
              </Link>
            </div>
          )}
          {props.actual > 9 && !inArray(decode(props.status.status), 9) && (
            <div>
              <Link
                className="link link__next link__full"
                to="/verification-admins"
                onClick={updateMenu}
              >
                {translate('components.validator.verification_admins')}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Validator
