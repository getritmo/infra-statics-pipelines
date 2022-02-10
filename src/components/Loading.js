import React from 'react'
import classNames from 'classnames'

export const Loading = ({ text }) => (
  <div
    className={classNames('spinner min-logo', {
      text: text,
    })}
  >
    <img
      src="/images/svg/ritmo-logo-min-circle.svg"
      alt=""
      width="72"
      height="72"
      className="logo-circle"
    />
    {text && <div className={'spinner__text'}>{text}</div>}

    <img
      src="/images/svg/ritmo-logo-min-ball.svg"
      alt=""
      width="72"
      height="72"
      className="logo-ball"
    />
  </div>
)
export const LoadingMin = () => (
  <div className="spinner min-logo relative">
    <img
      src="/images/svg/ritmo-logo-min-circle.svg"
      alt=""
      width="72"
      height="72"
      className="logo-circle"
    />

    <img
      src="/images/svg/ritmo-logo-min-ball.svg"
      alt=""
      width="72"
      height="72"
      className="logo-ball"
    />
  </div>
)

export const LoadingSize = ({ size = 72 }) => (
  <div className="sized-spinner">
    <img
      src="/images/svg/ritmo-logo-min-circle.svg"
      alt=""
      width={`${size}px`}
      height={`${size}px`}
      className="logo-circle"
    />

    <img
      src="/images/svg/ritmo-logo-min-ball.svg"
      alt=""
      width={`${size}px`}
      height={`${size}px`}
      className="logo-ball"
    />
  </div>
)

export default Loading
