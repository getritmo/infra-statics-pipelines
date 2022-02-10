import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { deepValue } from '../utils'

const CustomCheckbox = ({
  title,
  name,
  classes = {},
  required,
  hidden,
  readOnly = false,
  singleCol,
  errors,
  onChange = undefined,
  value,
}) => {
  const itemErrors = name && deepValue(errors, name)

  const ErrorsContainer = () =>
    itemErrors ? (
      <span className="rform__item--error">{itemErrors.message}</span>
    ) : (
      <div className="rform__item--error-empty" />
    )

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
        })}
      >
        <label className={classes.label}>
          {title}
          {required && <span>*</span>}
        </label>
        <input
          id={name || ''}
          name={name || ''}
          type={'checkbox'}
          value={value}
          className={classnames(
            classes.input,
            'rform__item--control checkbox',
            {
              readonly: readOnly,
            },
          )}
          onChange={onChange}
          {...{
            ...(!readOnly && { checked: value }),
            ...(readOnly && { defaultChecked: value }),
          }}
        />
      </div>
      {name && <ErrorsContainer />}
    </div>
  )
}

CustomCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  defaultValue: PropTypes.node,
  hidden: PropTypes.bool,
  readOnly: PropTypes.bool,
  singleCol: PropTypes.bool,
  errors: PropTypes.object,
}

export default CustomCheckbox
