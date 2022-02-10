import React from 'react'
import { useIntl } from 'react-intl'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import CustomButton from '../UI/CustomButton'

const Card = ({
  title,
  subtitle,
  type,
  product,
  color,
  onClick,
  actionButton = false,
  actionButtonLabel = '',
  actionButtonFunction = () => {},
  onFileChange,
  downloadFile = false,
  onFileDownload,
  inactive = false,
  children,
  inputFileRef = undefined,
}) => {
  const { formatMessage } = useIntl()

  return (
    <div
      className={classNames('card', { inactive })}
      onClick={(e) => !inactive && onClick(e)}
    >
      <div className="card__title--container">
        <div className="card__title--container-left">
          <h3 className="card__title">
            <b>{title}</b>
          </h3>
          <h4
            className={classNames('card__subtitle', {
              green: color === 'green',
              orange: color === 'orange',
            })}
          >
            <b>{subtitle}</b>
          </h4>
        </div>
        <div className="card__title--container-right">
          <h4 className={classNames('card__subtitle')}>
            <b>
              {product &&
                product
                  .split('_')
                  .map(
                    (word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`,
                  )
                  .join(' ')}
            </b>
          </h4>
        </div>
      </div>
      <div className="card__content">
        <div className="card__content--info">
          {children}

          {actionButton && (
            <div
              className="card__content--button"
              onClick={(e) => e.stopPropagation()}
            >
              <CustomButton
                label={actionButtonLabel}
                classes="card__button"
                onClick={actionButtonFunction}
              />
              {inputFileRef && (
                <input
                  ref={inputFileRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => onFileChange(e, inputFileRef)}
                />
              )}
            </div>
          )}
        </div>

        {/* Button for big screen */}
        {downloadFile && (
          <div className="card__content--icons">
            <span
              className={`card__content--icons-button ${type}-file`}
              onClick={(e) => {
                e.stopPropagation()
                onFileDownload()
              }}
            />
          </div>
        )}

        {/* Button for mobile view */}
        {downloadFile && (
          <div
            className="card__content--mobile-button"
            onClick={(e) => e.stopPropagation()}
          >
            <CustomButton
              label={formatMessage({ id: `components.card.${type}.download` })}
              variant="outlined"
              classes="card__button"
              onClick={(e) => {
                e.stopPropagation()
                onFileDownload()
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.object,
  type: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  actionButton: PropTypes.bool,
  actionButtonLabel: PropTypes.string,
  onFileChange: PropTypes.func,
  downloadFile: PropTypes.bool,
  onFileDownload: PropTypes.func,
  inactive: PropTypes.bool,
}

export default Card
