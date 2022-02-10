import React from 'react'

export const RitmoOverlay = ({ message }) => {
  return (
    <div className="overlay">
      <div className="overlay__container">
        <img
          src="/images/svg/ritmo-logo-blue.svg"
          alt=""
          className="overlay__img"
        />
        <h1 className="overlay__title">{message}</h1>
        <p>
          <div className="min-logo">
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
        </p>
      </div>
    </div>
  )
}

export default RitmoOverlay
