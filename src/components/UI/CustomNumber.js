import React, { useState } from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { deepValue } from './utils'
import { LoadingSize } from 'components/Loading'

const CustomNumber = ({
  title,
  name,
  classes = {},
  defaultValue = '',
  required,
  hidden,
  readOnly = false,
  singleCol,
  register,
  getValues,
  setValue,
  errors,
  loading = false,
  validate = undefined,
  onChange = undefined,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const { formatMessage } = useIntl()

  const value = getValues(name)
  const itemErrors = name && deepValue(errors, name)
  const validations = {}

  const handleOnChange = (e) => {
    if (onChange) onChange(e)
    setValue(name, e.target.value)
  }

  // Decimal is , or .
  const validNumber = /^(\d+)(,\d+|\.\d+)?$/
  // If decimal, use 1 or 2 decimal positions
  const decPos = /^(\d+)(,\d{1,2}|\.\d{1,2})?$/

  if (required) {
    Object.assign(validations, {
      required: {
        value: true,
        message: formatMessage({ id: 'components.UI.errors.inputRequired' }),
      },
      validate: {
        isNumber: (v) =>
          validNumber.test(v) ||
          formatMessage({ id: 'components.UI.errors.notValidNumber' }),
        decPostions: (v) =>
          decPos.test(v) ||
          formatMessage({ id: 'components.UI.errors.decimalsError' }),
        ...validate,
      },
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
        className={classnames(classes.group, 'rform__item--group', {
          error: itemErrors,
        })}
        onFocus={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setIsFocused(true)
        }}
        onBlur={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setIsFocused(false)
        }}
      >
        <label
          className={classnames(classes.label, 'rform__item--label', {
            active: value !== '' || isFocused,
          })}
        >
          {title}
          {required && <span>*</span>}
        </label>

        <input
          ref={name && register(validations)}
          id={name}
          name={name}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className={classnames(classes.input, 'rform__item--control', {
            readonly: readOnly,
          })}
          onChange={handleOnChange}
        />
        {loading && (
          <div className="rform__item--spinner">
            <LoadingSize size={16} />
          </div>
        )}
      </div>
      {itemErrors ? (
        <span className="rform__item--error">{itemErrors.message}</span>
      ) : (
        <div className="rform__item--error-empty" />
      )}
    </div>
  )
}

CustomNumber.propTypes = {
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
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  errors: PropTypes.object,
}

export default CustomNumber
