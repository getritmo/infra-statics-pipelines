import React from 'react'
import translate from '../../i18n/translate'
import classnames from 'classnames'

export const DashboardButtons = ({
  aggregate,
  onChangeAggregate,
  KPIType,
  filter,
  weeksRange,
}) => {
  const getButton = (filter, type) => {
    if (type === 'daily') {
      switch (filter) {
        case 'last_7_days':
          return false
        case 'last_2_weeks':
          return false
        default:
          return true
      }
    }

    if (type === 'weekly') {
      switch (filter) {
        case 'last_4_weeks':
          return true
        case 'last_3_months':
          return true
        case 'last_12_months':
          return true
        case 'year_to_date':
          return true
        default:
          return false
      }
    }
    if (type === 'monthly') {
      switch (filter) {
        case 'last_3_months':
          return true
        case 'last_12_months':
          return true
        case 'year_to_date':
          return true
        default:
          return false
      }
    }
  }
  return (
    <div className="dashboard__buttons">
      {(getButton(filter, 'daily') || weeksRange > 2) && (
        <button
          className={classnames('dashboard__button', {
            active: aggregate === 'daily',
          })}
          onClick={() => {
            if (aggregate !== 'daily') onChangeAggregate(KPIType, 'daily')
          }}
        >
          {translate('common.Daily')}
        </button>
      )}

      {(getButton(filter, 'weekly') || weeksRange > 4) && (
        <button
          className={classnames('dashboard__button', {
            active: aggregate === 'weekly',
          })}
          onClick={() => {
            if (aggregate !== 'weekly') onChangeAggregate(KPIType, 'weekly')
          }}
        >
          {translate('common.Weekly')}
        </button>
      )}
      {(getButton(filter, 'monthly') || weeksRange > 12) && (
        <button
          className={classnames('dashboard__button', {
            active: aggregate === 'monthly',
          })}
          onClick={() => {
            if (aggregate !== 'monthly') onChangeAggregate(KPIType, 'monthly')
          }}
        >
          {translate('common.Monthly')}
        </button>
      )}
    </div>
  )
}

export default DashboardButtons
