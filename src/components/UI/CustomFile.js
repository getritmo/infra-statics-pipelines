import React from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'

// This functions returns object nested stringified props
// i.e. object['prop1.prop2[3].prop3']
const deepValue = (obj, path) =>
  path
    .replace(/\[|\]\.?/g, '.')
    .split('.')
    .filter((s) => s)
    .reduce((acc, val) => acc && acc[val], obj)

const CustomFile = ({
  name,
  defaultValue,
  required,
  hidden,
  readOnly = false,
  singleCol,
  register,
  inputFileRef,
  getValues,
  errors,
  onChange,
}) => {
  const { formatMessage } = useIntl()

  const value = getValues(name)
  const itemErrors = deepValue(errors, name)

  const validations = {}

  if (required) {
    Object.assign(validations, {
      required: {
        value: true,
        message: formatMessage({ id: 'components.UI.errors.fileRequired' }),
      },
    })
  }

  return (
    <div
      className={classnames('rform__item--file', {
        'half-width': !singleCol,
        hidden,
      })}
    >
      <div
        className={classnames('rform__item--group', {
          active: value !== '',
          error: itemErrors,
        })}
      >
        <input
          ref={register(validations)}
          id={name}
          name={name}
          type="text"
          defaultValue={defaultValue}
          className={classnames('hidden')}
        />
        <input
          ref={inputFileRef}
          id={`${name}-input`}
          type="file"
          onChange={onChange}
          readOnly={readOnly}
          className={classnames('rform__item--control')}
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

export default CustomFile
