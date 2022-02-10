import React from 'react'
import classnames from 'classnames'
import { LoadingSize } from 'components/Loading'

const CustomButton = ({
  id,
  label,
  type = 'button',
  color = 'secondary',
  variant = 'contained',
  size = 'medium',
  position,
  classes,
  onClick = () => {},
  icon = <></>,
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      data-testid={id || ''}
      className={classnames(classes, {
        btn: variant === 'contained' || variant === 'outlined',
        ['btn-icon']: variant === 'icon',
        'btn-text': variant === 'text',
        'btn-link': variant === 'link',
        'btn-circular': variant === 'circular',
        [`btn-${color}`]: variant === 'contained' || variant === 'outlined',
        outlined: variant === 'outlined',
        orange: variant === 'text' && color === 'orange',
        [`position-${position}`]: !!position,
        [`btn-${size}`]: !!size,
        'btn-disabled': disabled,
        'btn-loading': loading,
      })}
      type={type}
      onClick={onClick}
    >
      {variant !== 'icon' && <span>{label}</span>}

      {variant === 'icon' && <>{icon}</>}

      {loading && (
        <div className={'btn-loading--spinner btn-center'}>
          <LoadingSize size={16} />
        </div>
      )}
    </button>
  )
}

export default CustomButton
