import React from 'react'
import PropTypes from 'prop-types'
import translate from '../../../i18n/translate'
import Card from '../../Cards'
import { useIntl } from 'react-intl'
import LoadingMin from '../../Loading'
import OfferIcon from 'components/UI/Icons/OfferIcon'
import useAPI from 'hooks/useAPI'
import { CustomButton } from 'components/UI'
import { useSelector } from 'react-redux'
import { getFormat } from 'data/data'

const Offers = ({ onAdd, onCardClick }) => {
  const { offers = [] } = useSelector((state) => state.appData.application)
  const company = useSelector((state) => state.appData.company)
  const { formatMessage, formatDate } = useIntl()
  const { apiFileDownload } = useAPI()

  const downloadFile = async (item) => {
    const url = `/admin/uploads/${item.id}`
    await apiFileDownload(url, 'GET', item.name)
  }

  // Just in case all data is not fetched
  if (!company) {
    return (
      <section className="accounts__section admin">
        <h2 className="layout-app__title">
          <OfferIcon classes="image-icon" />
          <span>{translate('views.company_item.offers')}</span>
        </h2>
        <LoadingMin />
      </section>
    )
  }

  return (
    <section className="accounts__section admin">
      <h2 className="layout-app__title">
        <OfferIcon classes="image-icon" />
        <span>{translate('views.company_item.offers')}</span>
      </h2>
      {offers.map((offer, offerIndex) => {
        return (
          <Card
            key={`offer-${offerIndex}`}
            title={`${company.name} ${formatMessage({
              id: 'common.Offer',
            })}`}
            subtitle={formatMessage({
              id: 'views.company_item.offer.accepted',
            })}
            product={offer.type}
            type="offer"
            color="green"
            onClick={() => onCardClick(offer)}
            downloadFile={!!offer.files?.length}
            onFileDownload={() => downloadFile(offer.files[0])}
          >
            <span className="card__content--item">
              {formatMessage({ id: 'components.card.offer.id' })}:&nbsp;&nbsp;
              {offer.id}
            </span>
            <span className="card__content--item">
              {formatMessage({ id: 'common.Currency' })}
              :&nbsp;&nbsp;{offer.currency}
            </span>
            {offer.type !== 'invoice_financing' ? (
              <>
                <span className="card__content--item">
                  {formatMessage({ id: 'components.card.offer.deployNum' })}
                  :&nbsp;&nbsp;{offer.deployments.length}
                </span>
                <span className="card__content--item">
                  {formatMessage({
                    id: 'components.card.offer.firstDeployDate',
                  })}
                  :&nbsp;&nbsp;
                  {formatDate(offer.deployments[0]?.deploy_date, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </span>
              </>
            ) : (
              <>
                <span className="card__content--item">
                  {formatMessage({
                    id: 'components.card.offer.total_credit_limit',
                  })}
                  :&nbsp;&nbsp;
                  {getFormat(
                    offer.total_credit_limit / 100,
                    'eur',
                    true,
                    offer.currency,
                  )}
                </span>
              </>
            )}
          </Card>
        )
      })}

      <div className="table__no-info table__column">
        {offers.length === 0 && (
          <span>{translate('views.company_item.no_files')}</span>
        )}
        <CustomButton
          onClick={onAdd}
          label={translate('common.new_offer')}
          classes={'table__card--button'}
        />
      </div>
    </section>
  )
}

Offers.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
}

export default Offers
