import React from 'react'

const CustomViewer = ({ title, value }) => {
  return (
    <div className="rform__confirmation--group">
      <span className="rform__confirmation--group-title">{title}</span>
      <span className="rform__confirmation--group-value">
        <strong>{value}</strong>
      </span>
    </div>
  )
}

export default CustomViewer
