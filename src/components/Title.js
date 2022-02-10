/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'

const Content = (props) => {
  return (
    <div className="">
      {props.tag === 'H1' && (
        <>
          <h1 className={props.class !== undefined ? props.class : 'title-h1'}>
            {props.children}
          </h1>
        </>
      )}
      {props.tag === 'H2' && (
        <>
          <h2 className={props.class !== undefined ? props.class : 'title-h2'}>
            {props.children}
          </h2>
        </>
      )}
    </div>
  )
}

export default Content
