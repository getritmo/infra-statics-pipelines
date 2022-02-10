import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import { deepValue } from '../utils'
import Select, { components } from 'react-select'
import { useStyles } from './styles'

const CustomSelect = ({
  title,
  name,
  classes = {},
  options = [],
  defaultValue = null,
  onChange = undefined,
  isSearcheable = false,
  required,
  singleCol,
  hideErrors,
  maxMenuHeight = 140,
  register,
  setValue,
  getValues,
  watch,
  onMenuOpen,
  menuPlacement,
  errors,
}) => {
  const { formatMessage } = useIntl()

  const placeholderOpt = {
    label: formatMessage({ id: 'common.Select_option' }),
    value: undefined,
    isDisabled: true,
    isDefault: true,
  }
  const defaultSelectedOption =
    options.find((option) => option.value === defaultValue) || placeholderOpt

  const [selectedValue, setSelectedValue] = useState(defaultSelectedOption)
  const styles = useStyles({ isSearcheable, classes })
  const value = watch && watch(name)

  useEffect(() => {
    setSelectedValue(options.find((option) => option.value === value))
  }, [options, getValues, setValue, name, value])

  const itemErrors = name && deepValue(errors, name)

  const validations = {}
  if (required) {
    Object.assign(validations, {
      required: formatMessage({ id: 'components.UI.errors.optionRequired' }),
    })
  }

  const handleChange = (e) => {
    if (onChange) onChange(e.value)
    setSelectedValue(options.find((option) => option.value === e.value))
    setValue(name, e.value)
  }

  const { Control, ValueContainer, Placeholder, Option, Menu, MenuPortal } =
    components

  const CustomControl = ({ children, ...props }) => {
    return (
      <Control {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.label}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null,
        )}
      </Control>
    )
  }

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null,
        )}
      </ValueContainer>
    )
  }

  const CustomOption = ({ children, ...props }) => {
    const innerPropsCopy = props.innerProps
    delete innerPropsCopy.onMouseMove
    delete innerPropsCopy.onMouseOver
    const newProps = { ...props, innerProps: innerPropsCopy }
    newProps.innerProps.id = newProps.data.id
    // console.log('newProps: ', newProps)
    return (
      <Option {...newProps} className="custom__option">
        {children}
      </Option>
    )
  }

  const CustomMenu = ({ children, ...props }) => {
    return (
      <Menu {...props}>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null,
        )}
      </Menu>
    )
  }

  const CustomMenuPortal = ({ children, ...props }) => {
    return (
      <MenuPortal {...props}>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null,
        )}
      </MenuPortal>
    )
  }

  return (
    <div
      className={classnames(classes.item, 'rform__item', {
        'half-width': !singleCol,
      })}
    >
      <Select
        ref={name && register(name, validations)}
        id={name}
        name={name}
        maxMenuHeight={maxMenuHeight}
        onChange={handleChange}
        value={selectedValue}
        placeholder={formatMessage({ id: 'common.Select_option' })}
        options={
          options.find((option) => option.value === defaultValue)
            ? options.map((option) => ({
                ...option,
                id: `${name}-option-${option.value}`,
              }))
            : [placeholderOpt].concat(
                options.map((option) => ({
                  ...option,
                  id: `${name}-option-${option.value}`,
                })),
              )
        }
        label={
          <>
            {title}
            {required && <span>*</span>}
          </>
        }
        components={{
          Control: CustomControl,
          ValueContainer: CustomValueContainer,
          Option: CustomOption,
          Menu: CustomMenu,
          MenuPortal: CustomMenuPortal,
        }}
        styles={{ ...styles }}
        isSearchable={isSearcheable}
        classNamePrefix="custom__select"
        onMenuOpen={onMenuOpen}
        // menuIsOpen={name === 'monthly_income'}
        menuPlacement={menuPlacement || 'auto'}
        // menuPosition={'fixed'}
      />

      {itemErrors && (
        <span className="rform__item--error">{errors[name].message}</span>
      )}
      {!hideErrors && !itemErrors && (
        <div className="rform__item--error-empty" />
      )}
    </div>
  )
}

export default CustomSelect
