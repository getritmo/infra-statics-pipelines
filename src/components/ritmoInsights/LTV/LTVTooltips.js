import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import { useIntl } from 'react-intl'
import translate from 'i18n/translate'
import { formatMonthAndYear } from 'data/data'

const LTVTooltips = ({ data, x, y }) => {
  const { formatNumber, locale } = useIntl()

  const isHeader = (x === 1 || (x >= 15 && x <= 20)) && y === -1

  return (
    <ReactTooltip
      id="LTVTooltip"
      aria-haspopup="true"
      role="example"
      effect="solid"
      place="top"
      delayShow={isHeader ? 0 : 100}
      className={'tooltip__ltv'}
    >
      {isHeader && <>{translate(`data.ri.ltv.tooltip.descriptions.${x}`)}</>}
      {x >= 2 && x <= 14 && y >= 0 && y <= 12 && (
        <>
          {translate('data.ri.ltv.tooltip.data_point', {
            initialDate: formatMonthAndYear(data[y]?.x, locale),
            retention: formatNumber(data[y]?.cohort[x - 2]?.retention, {
              style: 'percent',
              minimumFractionDigits: 2,
            }),
            currentDate: formatMonthAndYear(
              moment(data[y]?.x).add(x - 2, 'month'),
              locale,
            ),
            revenue: formatNumber(data[y]?.cohort[x - 2]?.revenue, {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
            }),
            orders: data[y]?.cohort[x - 2]?.order,
            aov: formatNumber(data[y]?.cohort[x - 2]?.aov, {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
            }),
            customer: data[y]?.cohort[x - 2]?.customer,
          })}
        </>
      )}
    </ReactTooltip>
  )
}

LTVTooltips.propTypes = {
  data: PropTypes.array.isRequired,
  hoverX: PropTypes.number,
  hoverY: PropTypes.number,
}

export default LTVTooltips
