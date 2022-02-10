import React, { useMemo } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../Loading'
import { businessType, monthlyIncomeByCurrency } from './../../data/data'
import { Link } from 'react-router-dom'
import translate from '../../i18n/translate'
import { useIntl } from 'react-intl'
import { getActiveDeploys } from 'components/Forms/Payments/utils'
import { CustomButton } from 'components/UI'
import { EditIcon } from '../UI/Icons'
import { useSelector, useDispatch } from 'react-redux'
import { openPanel } from 'actions/global'

export const CompanyInfo = () => {
  const {
    appData: { application, company },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { formatMessage } = useIntl()

  const activeDeployments = useMemo(
    () => getActiveDeploys(application.offers),
    [application.offers],
  )

  const { address, address_extra, country, city, province, zip } =
    application?.stages?.company_details

  const handleEditCompany = () => {
    dispatch(
      openPanel({
        type: 'form',
        subtype: 'company',
        mode: 'update',
        formData: company,
      }),
    )
  }

  const handlePaymentCreation = () => {
    dispatch(
      openPanel({
        type: 'form',
        subtype: 'payment',
        mode: 'create',
        formData: undefined,
      }),
    )
  }

  return (
    <div className="table__row">
      <div className="table item">
        <div className="table__header table__cell">
          <div className="table__title">{company.name}</div>
          <CustomButton
            variant="icon"
            position="left"
            size="medium"
            icon={<EditIcon fill={'#000'} height={'50%'} width={'50%'} />}
            classes="btn-edit-info"
            onClick={handleEditCompany}
          />
        </div>

        {activeDeployments.length > 0 && (
          <div className="table__cell form-payment">
            <CustomButton
              label={translate('admin.payments.layout_title')}
              onClick={handlePaymentCreation}
            />
          </div>
        )}

        <div className="table__row">
          <div className="table__cell">
            <label>{translate('common.monthly_income')}</label>
            <div>
              <span>
                {formatMessage({
                  id: monthlyIncomeByCurrency(company.currency)[
                    company.monthly_income
                  ].name,
                })}
              </span>
            </div>
          </div>
          <div className="table__cell">
            <label>{translate('common.business_type')}</label>
            <div>
              <span>
                {formatMessage({
                  id: businessType.find(
                    (item) => item.value === company.business_type,
                  ).name,
                })}
              </span>
            </div>
          </div>
          <div className="table__cell">
            <label>{translate('common.website')}</label>
            <div>
              <a
                href={`https://${company.website}`}
                rel="noopener noreferrer"
                target="_blank"
                className="link link__full"
              >
                {company.website}
              </a>
            </div>
          </div>
          {application && (
            <div className="table__cell">
              <label>{translate('common.Status')}</label>
              <div>{application.status}</div>
            </div>
          )}
          {company && (
            <>
              <div className="table__cell">
                <label>{translate('components.company_info.userEmail')}</label>
                <div>{company.owner_email}</div>
              </div>
              <div className="table__cell">
                <div className="rform__item--group checkbox__container">
                  <input
                    id="auth-mode"
                    type="checkbox"
                    checked={company.login_method === 'auth0' ? 'auth0' : false}
                    readOnly
                    className="rform__item--control checkbox view-only"
                  />
                  <label className="checkbox-view-only">
                    {translate('components.company_info.registrationType')}
                  </label>
                  <br />
                  <br />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="table__row half">
          <div className="table__cell">
            <label>{translate('common.company_details')}</label>
            <div>
              {application.stages.company_details.legal_name}
              <br />
              {application.stages.company_details.fiscal_id}
            </div>
          </div>
          <div className="table__cell">
            <label>{translate('common.Address')}</label>
            <div>
              {address && <>{address}</>}
              {address && address_extra && <>&nbsp;-&nbsp;</>}
              {address_extra && <>{address_extra}</>}
              <br />
              {zip && <>{zip}</>}
              {zip && province && <>&nbsp;-&nbsp;</>}
              {province && <>{province}</>}
              <br />
              {city && <>{city}</>}
              {city && country && <>&nbsp;-&nbsp;</>}
              {country &&
                formatMessage({
                  id: `data.countries.${country}`,
                })}
              <br />
            </div>
          </div>
        </div>
        <div className="table__row left menu">
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id
              }
              className="link link__full"
            >
              Application
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/graph'
              }
              className="link link__full"
            >
              Open Banking
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/payments'
              }
              className="link link__full"
            >
              {translate('common.Payments')}
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/ritmo-insights'
              }
              className="link link__full"
            >
              RITMO Insights
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/ltv'
              }
              className="link link__full"
            >
              LTV
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/scorecard'
              }
              className="link link__full"
            >
              Scorecard
            </Link>
          </div>
          <div className="table__cell">
            <Link
              to={
                '/admin/companies/' +
                company.company_id +
                '/' +
                application.application_id +
                '/my-advances'
              }
              className="link link__full"
            >
              My Advances
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthenticationRequired(CompanyInfo, {
  Redirecting: () => <Loading />,
})
