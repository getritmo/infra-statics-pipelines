import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { CustomButton } from 'components/UI'

const Dialog = ({
  title,
  acceptLabel,
  cancelLabel,
  onClose = () => {},
  onCancel,
  onAccept,
  disableClose,
  children,
}) => {
  const { formatMessage } = useIntl()

  const preventDefault = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="confirm" onClick={!disableClose ? onClose : undefined}>
      <div className="confirm__container" onClick={preventDefault}>
        {!disableClose && <div className="confirm__close" onClick={onClose} />}
        <h3 className="confirm__title">{title}</h3>

        {children}

        <div className="confirm__actions">
          <CustomButton
            color="alert"
            onClick={onAccept}
            label={acceptLabel ?? formatMessage({ id: 'common.Accept' })}
            classes={'confirm__btn'}
          />
          {onCancel && (
            <CustomButton
              color="cancel"
              onClick={onCancel}
              label={cancelLabel ?? formatMessage({ id: 'common.Accept' })}
              classes={'confirm__btn'}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  acceptLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  onAccept: PropTypes.func,
  disableClose: PropTypes.bool,
}

export default Dialog
