import React, { useState } from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { deepValue } from './utils'

const CustomText = ({
  title = '',
  name,
  placeholder = undefined,
  classes = {},
  defaultValue,
  required,
  hidden,
  readOnly = false,
  singleCol,
  register,
  getValues,
  setValue,
  errors,
  validate = undefined,
  onChange = undefined,
  inputValue,
  hideErrors,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const { formatMessage } = useIntl()

  const value = getValues ? getValues(name) : inputValue
  const itemErrors = name && deepValue(errors, name)

  const validations = {}

  const handleOnChange = (e) => {
    if (onChange) onChange(e)
    if (setValue) setValue(name, e.target.value)
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
        className={classnames(classes.container, 'rform__item--group', {
          active: value !== '' || isFocused || placeholder,
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
          className={classnames('rform__item--label', classes.label, {
            active: value !== '' || isFocused || placeholder,
          })}
        >
          {title}
          {required && <span>*</span>}
        </label>
        <input
          ref={name && register ? register(validations) : null}
          id={name}
          name={name}
          placeholder={placeholder && !isFocused ? placeholder : null}
          type={'text'}
          defaultValue={defaultValue ?? ''}
          readOnly={readOnly}
          className={classnames(classes.input, 'rform__item--control', {
            readonly: readOnly,
          })}
          onChange={handleOnChange}
        />
      </div>
      {itemErrors && (
        <span className={classnames(classes.error, 'rform__item--error')}>
          {itemErrors.message}
        </span>
      )}
      {!hideErrors && !itemErrors && (
        <div className="rform__item--error-empty" />
      )}
    </div>
  )
}

CustomText.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  defaultValue: PropTypes.node,
  required: PropTypes.bool,
  hidden: PropTypes.bool,
  readOnly: PropTypes.bool,
  singleCol: PropTypes.bool,
  register: PropTypes.func,
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  errors: PropTypes.object,
}

export default CustomText
