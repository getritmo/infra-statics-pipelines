import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import translate from '../../i18n/translate'
import { useDispatch } from 'react-redux'
import { updateKey } from './../../data/data'
import { RutterContext } from 'context/RutterContext'
import { setOverlay } from 'actions/global'
import useAsyncActions from 'hooks/useAsyncActions'

const AvailableAccounts = ({ item }) => {
  const dispatch = useDispatch()
  const { startsConnection } = useAsyncActions()
  const { openRutter } = useContext(RutterContext)

  const handleStartConnection = (e, connector) => {
    switch (connector) {
      case 'mercadolibre':
      case 'mercadopago':
        dispatch(
          setOverlay({
            open: true,
            type: 'ML-MP',
            connector,
          }),
        )
        break
      default:
        startsConnection(e, { connector }, openRutter)
        break
    }
  }

  return (
    <div key={item} className="accounts__item--container">
      <label
        htmlFor={updateKey(item)}
        data-id={updateKey(item)}
        className={'accounts__item ' + updateKey(item)}
        onClick={(e) => {
          handleStartConnection(e, item)
        }}
      >
        {item.indexOf('openbanking') !== -1 && <div>Open Banking</div>}
        {item.indexOf('openbanking') === -1 &&
          item.indexOf('others') === -1 && (
            <img
              src={'/images/accounts/' + updateKey(item) + '.png'}
              alt={updateKey(item)}
            />
          )}
        {item.indexOf('others') !== -1 && (
          <div>{translate('components.available_accounts.other_accounts')}</div>
        )}
      </label>
    </div>
  )
}

AvailableAccounts.propTypes = {
  item: PropTypes.string.isRequired,
}

export default AvailableAccounts
