import React, { useState } from 'react'
import { closePanel } from 'actions/global'
import { useSelector, useDispatch } from 'react-redux'
import InfoContent from './Info/index'
import Uploads from './Uploads/Uploads'
import { useIntl } from 'react-intl'
import Forms from 'components/Forms/Forms'
import Dialog from 'components/Dialog/Dialog'
import LockIcon from '../UI/Icons/LockIcon'
import PanelAccount from './Accounts/PanelAccount'
import PanelRI from 'components/Panel/RI/PanelRI'

const Panel = () => {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const { formatMessage } = useIntl()
  const dispatch = useDispatch()

  const open = useSelector((state) => state.globalState.panel.open)
  const type = useSelector((state) => state.globalState.panel.type)
  const subtype = useSelector((state) => state.globalState.panel.subtype)
  const mode = useSelector((state) => state.globalState.panel.mode)
  const onCloseConfirmation = useSelector(
    (state) => state.globalState.panel.onCloseConfirmation,
  )

  const onClose = () => {
    if (onCloseConfirmation) {
      setOpenConfirmationDialog(true)
    } else {
      dispatch(closePanel())
    }
  }

  const preventClose = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      {open && (
        <section id="panel-account" className="panel">
          {openConfirmationDialog && (
            //This dialog is to close
            <Dialog
              title={
                <b>
                  {formatMessage({ id: 'components.panel.dialog.sureToClose' })}
                </b>
              }
              acceptLabel={formatMessage({
                id: 'components.panel.dialog.accept',
              })}
              cancelLabel={formatMessage({
                id: 'components.panel.dialog.cancel',
              })}
              disableClose
              onAccept={() => {
                setOpenConfirmationDialog(false)
                dispatch(closePanel())
              }}
              onCancel={() => setOpenConfirmationDialog(false)}
            >
              <div className="confirm__content">
                {formatMessage({ id: 'components.panel.dialog.lostData' })}
              </div>
            </Dialog>
          )}
          <div className="panel__blackout" onClick={onClose} />
          <div className="panel__container" onClick={preventClose}>
            <div className="panel__container--cell">
              <div className="panel__header">
                <div className="panel__header--text">
                  {type === 'info' && (
                    <LockIcon height={'30px'} width={'30px'} />
                  )}
                  <b>
                    {formatMessage({
                      id: `components.panel.${type}.${subtype}.${mode}`,
                    })}
                  </b>
                </div>
                <div className="panel__header--close" onClick={onClose} />
              </div>
              <div
                className="panel__content--scroll--wrapper"
                onClick={preventClose}
              >
                <div className="panel__content--scroll" onClick={preventClose}>
                  <div className="panel__content--scroll--content">
                    {type === 'info' && <InfoContent {...{ subtype }} />}
                    {type === 'form' && <Forms />}
                    {type === 'upload' && <Uploads />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <PanelRI />
      <PanelAccount />
    </>
  )
}

export default Panel
