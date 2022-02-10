import React from 'react'
import translate from 'i18n/translate'
import { useIntl } from 'react-intl'
import { closeOverlay } from 'actions/global'
import { useSelector, useDispatch } from 'react-redux'
import Error403Icon from 'components/UI/Icons/Error403Icon'
import { preventDefault } from 'data/data'
import { CustomButton } from 'components/UI'
import useAsyncActions from 'hooks/useAsyncActions'

export const Overlay403 = () => {
  const { formatMessage } = useIntl()

  const {
    globalState: {
      overlay: { connector },
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { startsConnection } = useAsyncActions()

  const handleCancel = () => dispatch(closeOverlay())
  const handleClick = (e) => startsConnection(e, { connector })

  return (
    <div className="confirm" onClick={handleCancel}>
      <div className="confirm__container" onClick={preventDefault}>
        <div className="confirm__close" onClick={handleCancel} />
        <h3 className="confirm__title">
          <Error403Icon classes={'confirm__warning'} />
          {translate('components.overlay_403.connection_problem', {
            connector: translate(`common.connectors.${connector}`),
          })}
        </h3>
        <div className="confirm__explanation">
          <span>{translate(`components.overlay_403.${connector}_advice`)}</span>
          {(connector === 'googleads' || connector === 'googleanalytics') && (
            <img
              src={formatMessage({
                id: `components.overlay_403.${connector}_image`,
              })}
              alt={formatMessage({
                id: `components.overlay_403.${connector}_alt`,
              })}
              className="confirm__explanation--image"
            />
          )}
        </div>
        <div className="confirm__actions one-button">
          <CustomButton
            label={translate('components.overlay_403.activate')}
            onClick={handleClick}
            classes={'confirm__btn'}
          />
        </div>
      </div>
    </div>
  )
}

export default Overlay403
