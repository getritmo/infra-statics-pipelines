import React from 'react'
import translate from '../i18n/translate'

const ModalPrivacy = (props) => {
  const closeModal = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // parent function to manage the modal
    props.setModal(false)
  }

  const preventModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="modal fade show" onClick={closeModal}>
      <div className="modal-dialog">
        <div className="modal-content" onClick={preventModal}>
          <div className="modal-header">
            <h5 className="modal-title">
              {translate('components.modal_privacy.title')}
            </h5>
            <button
              type="button"
              data-dismiss="modal"
              onClick={closeModal}
              aria-label="Close"
              className="close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <table className="table">
              <tbody>
                <tr>
                  <td className="pregunta">
                    {translate('components.modal_privacy.table1')}
                  </td>
                  <td>{translate('components.modal_privacy.table2')}</td>
                </tr>
                <tr>
                  <td> {translate('components.modal_privacy.table3')}</td>
                  <td>
                    {translate('components.modal_privacy.table4')}{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.getritmo.com/politica-de-privacidad"
                      className="link link__full"
                    >
                      + info{' '}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pregunta">
                    {translate('components.modal_privacy.table5')}
                  </td>
                  <td>
                    {translate('components.modal_privacy.table6')}{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.getritmo.com/politica-de-privacidad"
                      className="link link__full"
                    >
                      + info{' '}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pregunta">
                    {translate('components.modal_privacy.table7')}
                  </td>
                  <td>
                    {translate('components.modal_privacy.table8')}{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.getritmo.com/politica-de-privacidad"
                      className="link link__full"
                    >
                      + info{' '}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pregunta">
                    {translate('components.modal_privacy.table9')}
                  </td>
                  <td>{translate('components.modal_privacy.table10')} </td>
                </tr>
                <tr>
                  <td className="pregunta">
                    {translate('components.modal_privacy.table11')}
                  </td>
                  <td>
                    {translate('components.modal_privacy.table12')}{' '}
                    <a
                      href="mailto:help@getritmo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link__full"
                    >
                      help@getritmo.com
                    </a>
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link__full"
                      href="https://www.getritmo.com/politica-de-privacidad"
                    >
                      + info{' '}
                    </a>
                    <br />
                    <br />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPrivacy
