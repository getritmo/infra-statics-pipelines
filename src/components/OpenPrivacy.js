import React from 'react'

const OpenPrivacy = ({ setModal }) => {
  const openPrivacyModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setModal(true)
  }

  return (
    <>
      <a
        href="/"
        data-toggle="modal"
        data-target="#privacyModal"
        onClick={openPrivacyModal}
      >
        <i className="fas fa-info-circle">i</i>
      </a>
    </>
  )
}

export default OpenPrivacy
