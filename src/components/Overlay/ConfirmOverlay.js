import React from 'react'
import translate from 'i18n/translate'
import { useSelector, useDispatch } from 'react-redux'
import { closeOverlay } from 'actions/global'
import { preventDefault } from 'data/data'
import { CustomButton } from 'components/UI'
import useAsyncActions from 'hooks/useAsyncActions'

export const ConfirmOverlay = () => {
  const {
    globalState: {
      overlay: { connector, connectorId },
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { removeAccountAccept } = useAsyncActions()

  const acceptAction = () => removeAccountAccept(connector, connectorId)

  const cancelAction = () => dispatch(closeOverlay())

  return (
    <div className="confirm" onClick={cancelAction}>
      <div className="confirm__container" onClick={preventDefault}>
        <div className="confirm__close" onClick={cancelAction} />
        <h3 className="confirm__title">
          {translate('components.confirm_overlay.delete_account', {
            connector: translate(`common.connectors.${connector}`),
          })}
        </h3>
        <div className="confirm__actions">
          <CustomButton
            color="alert"
            label={translate('common.Yes')}
            onClick={() => {
              acceptAction(connector)
            }}
            classes={'confirm__btn'}
          />

          <CustomButton
            color="cancel"
            label={translate('common.Cancel')}
            onClick={cancelAction}
            classes={'confirm__btn'}
          />
        </div>
      </div>
    </div>
  )
}

export default ConfirmOverlay
