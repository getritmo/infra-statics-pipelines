import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { deepValue } from './utils'

const CustomCheckbox = ({
  title,
  name,
  classes = '',
  defaultChecked = false,
  required,
  hideErrors,
  hidden,
  readOnly = false,
  singleCol,
  register,
  setValue,
  errors,
  validate = {},
  onChange = undefined,
}) => {
  const [checked, setChecked] = useState(!!defaultChecked)
  const inputRef = useRef(null)

  const { formatMessage } = useIntl()

  const itemErrors = name && deepValue(errors, name)

  const validations = { ...validate }

  const handleOnChange = (e) => {
    if (onChange) onChange(e)
    setValue(
      name,
      e.target.checked ? Boolean(e.target.checked).toString() : undefined,
    )
    setChecked(e.target.checked)
  }

  if (required) {
    Object.assign(validations, {
      required: {
        value: true,
        message: formatMessage({ id: 'components.UI.errors.inputRequired' }),
      },
    })
  }

  return (
    <div
      className={classnames('rform__item', {
        'half-width': !singleCol,
        hidden,
      })}
    >
      <div
        className={classnames(classes.item, 'rform__item--group checkbox', {
          error: itemErrors && !checked,
          readonly: readOnly,
        })}
        onClick={() => {
          if (inputRef.current) inputRef.current.focus()
        }}
      >
        <input
          ref={(e) => {
            if (register) register(name, validations)
            inputRef.current = e
          }}
          id={name}
          name={name}
          type="checkbox"
          readOnly={readOnly}
          className={classnames(
            classes.input,
            'rform__item--control checkbox',
            {
              readonly: readOnly,
            },
          )}
          onChange={handleOnChange}
          checked={checked}
        />
        <label
          onClick={() => {
            if (!readOnly) {
              setValue(name, checked ? false : 'true')
              setChecked((s) => !s)
            }
          }}
          className={classnames('rform__item--label checkbox', {
            'checkbox-error': itemErrors && !checked,
            [classes.label]: classes.label,
          })}
          data-cy={`${name}-checkbox-label`}
        >
          {title}
          {required && <span>*</span>}
        </label>
      </div>
      {!hideErrors && itemErrors && (
        <span className="rform__item--error">{itemErrors.message}</span>
      )}
      {!hideErrors && !itemErrors && (
        <div className="rform__item--error-empty" />
      )}
    </div>
  )
}

CustomCheckbox.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  name: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'checkbox', 'date']),
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

export default CustomCheckbox
