import React from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { deepValue } from './utils'

const CustomDate = ({
  title,
  name,
  classes = {},
  defaultValue,
  min = undefined,
  max,
  required,
  hidden,
  readOnly = false,
  singleCol,
  register,
  setValue,
  errors,
  validate = undefined,
  onChange = undefined,
}) => {
  const { formatMessage } = useIntl()

  const itemErrors = name && errors && deepValue(errors, name)

  const validations = {}

  const handleOnChange = (e) => {
    if (onChange) onChange(e)
    setValue(name, e.target.value)
  }

  if (required) {
    Object.assign(validations, {
      required: {
        value: true,
        message: formatMessage({ id: 'components.UI.errors.inputRequired' }),
      },
      validate,
    })
  }

  return (
    <div
      className={classnames(classes.item, 'rform__item', {
        'half-width': !singleCol,
        hidden,
      })}
    >
      <div
        className={classnames(classes.group, 'rform__item--group active', {
          error: itemErrors,
        })}
      >
        <label
          className={classnames(classes.label, 'rform__item--label active')}
        >
          {title}
          {required && <span>*</span>}
        </label>
        <input
          ref={name && register ? register(validations) : null}
          id={name}
          name={name}
          type="date"
          min={min}
          max={max}
          defaultValue={defaultValue ?? ''}
          readOnly={readOnly}
          className={classnames('rform__item--control', {
            readonly: readOnly,
          })}
          onChange={handleOnChange}
        />
      </div>
      {itemErrors ? (
        <span className="rform__item--error">{itemErrors.message}</span>
      ) : (
        <div className="rform__item--error-empty" />
      )}
    </div>
  )
}

CustomDate.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  defaultValue: PropTypes.node,
  min: PropTypes.node,
  step: PropTypes.number,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
  readOnly: PropTypes.bool,
  singleCol: PropTypes.bool,
  register: PropTypes.func,
  setValue: PropTypes.func,
  errors: PropTypes.object,
}

export default CustomDate
