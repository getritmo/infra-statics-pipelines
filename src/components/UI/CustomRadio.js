import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { deepValue } from './utils'
import { useIntl } from 'react-intl'

const CustomRadio = ({
  title,
  name,
  classes = {},
  required,
  hidden,
  readOnly = false,
  singleCol,
  register,
  setValue,
  value,
  errors,
  validate = undefined,
  selected = false,
}) => {
  const { formatMessage } = useIntl()

  const itemErrors = name && deepValue(errors, name)

  const validations = {}

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
      className={classnames('rform__item', {
        'half-width': !singleCol,
        hidden,
      })}
    >
      <div
        className={classnames(classes.item, 'rform__item--group checkbox', {
          error: itemErrors,
          selected,
        })}
      >
        <label className={classes.label} onClick={() => setValue(name, value)}>
          {title}
          {required && <span>*</span>}
        </label>
        <input
          ref={name && register && register(validations)}
          id={`field-${value}`}
          name={name || ''}
          type={'radio'}
          readOnly={readOnly}
          onClick={() => setValue(name, value)}
          className={classnames('rform__item--control checkbox', {
            readonly: readOnly,
          })}
          value={value}
        />
      </div>
    </div>
  )
}

CustomRadio.propTypes = {
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

export default CustomRadio
