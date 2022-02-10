import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import { useIntl } from 'react-intl'
import { CustomButton } from './index'
import { en, es } from 'react-date-range/dist/locale'

const CustomDaterange = ({
  onChange,
  openCallendar = false,
  handleOpenCallendar = () => {},
  onApply = () => {},
  startDate = moment(new Date()).subtract(4, 'weeks').toDate(),
  endDate = new Date(),
  classes,
}) => {
  const [datepickerState, setDatepickerState] = useState([
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ])
  const [callendarLocale, setCallendarLocale] = useState(es)

  const { formatMessage, locale } = useIntl()

  useEffect(() => {
    switch (locale) {
      case 'en-GB':
        setCallendarLocale(en)
        break
      default:
        setCallendarLocale(es)
        break
    }
  }, [locale])

  return (
    <div
      className={`datepicker ${classes}`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      <div className="datepicker__control">
        <input
          className="datepicker__control-input"
          type="date"
          value={moment(datepickerState[0].startDate).format('YYYY-MM-DD')}
          onClick={() => {
            if (!openCallendar) handleOpenCallendar()
          }}
          onChange={(e) => {
            if (e.target.value) {
              e.persist()
              setDatepickerState((s) => [
                {
                  ...s[0],
                  startDate: moment(e.target.value).toDate(),
                },
              ])
              if (onChange) {
                onChange([
                  {
                    ...datepickerState[0],
                    startDate: moment(e.target.value).toDate(),
                  },
                ])
              }
            }
          }}
        />
        <span
          className="datepicker__control-text"
          onClick={() => {
            if (!openCallendar) handleOpenCallendar()
          }}
        >
          {formatMessage({ id: 'common.to' })}
        </span>
        <input
          className="datepicker__control-input date-from"
          type="date"
          value={moment(datepickerState[0].endDate).format('YYYY-MM-DD')}
          onClick={() => {
            if (!openCallendar) handleOpenCallendar()
          }}
          onChange={(e) => {
            if (e.target.value) {
              e.persist()
              setDatepickerState((s) => [
                {
                  ...s[0],
                  endDate: moment(e.target.value).toDate(),
                },
              ])
              if (onChange) {
                onChange([
                  {
                    ...datepickerState[0],
                    endDate: moment(e.target.value).toDate(),
                  },
                ])
              }
            }
          }}
        />
      </div>
      {openCallendar && (
        <>
          <div
            className="datepicker__callendar"
            onClick={(e) => e.stopPropagation()}
          >
            <DateRange
              editableDateInputs
              onChange={(item) => {
                setDatepickerState([{ ...item.selection }])
                if (onChange) onChange([{ ...item.selection }])
              }}
              moveRangeOnFirstSelection={false}
              rangeColors={['#2793FF']}
              ranges={datepickerState}
              maxDate={new Date()}
              showDateDisplay={false}
              retainEndDateOnFirstSelection
              locale={callendarLocale}
            />
            <CustomButton
              label={formatMessage({ id: 'common.Apply' })}
              size="small"
              classes="datepicker__callendar--button"
              onClick={onApply}
            />
          </div>
        </>
      )}
    </div>
  )
}

CustomDaterange.propTypes = {
  onChange: PropTypes.func,
  openCallendar: PropTypes.bool,
  handleOpenCallendar: PropTypes.func,
  onApply: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  classes: PropTypes.string,
}

export default CustomDaterange
