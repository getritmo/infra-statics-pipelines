import React, { useState, useEffect } from 'react'
import OfferForm from './Forms/Offer/OfferForm'
import ViewOffer from './Forms/Offer/ViewOffer'
import {
  parseOfferForm,
  parseOfferNumericInputs,
  parseInvoiceOfferNumericInputs,
  parseInvoiceOfferForm,
} from './Forms/utils'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import useAPI from 'hooks/useAPI'
import { useParams } from 'react-router'
import ActivateDeploy from './Forms/Offer/ActivateDeploy'
import ConfirmDeployActivation from './Forms/Offer/ConfirmDeployActivation'
import useAsyncActions from 'hooks/useAsyncActions'
import SelectOfferType from './Forms/Offer/SelectOfferType'
import InvoiceFinanceOffer from './Forms/Offer/InvoiceFinanceOfferForm'
import ViewInvoiceOffer from './Forms/Offer/ViewInvoiceOfferForm'

const PanelForm = ({
  panelAccount,
  onClose,
  formType,
  data,
  fileId,
  setFormType,
}) => {
  const [formData, setFormData] = useState(data)
  const [formToSend, setFormToSend] = useState(new FormData())
  const [step, setStep] = useState(0) // 0 - Form step, 1 - validation step
  const [selectedDeploy, setSelectedDeploy] = useState(undefined)
  const [activationData, setActivationData] = useState(undefined)

  const { applicationId } = useParams()
  const { formatMessage } = useIntl()
  const {
    apiCallApplicationsAdminFormData,
    apiCallApplicationsAdmin,
    apiFileFetch,
  } = useAPI()

  const { getApplicationById } = useAsyncActions()

  useEffect(() => {
    //Fetch file
    const fetchFile = async (fileId) => {
      const url = `admin/uploads/${fileId}`
      const file = await apiFileFetch(url, 'GET')
      setFormToSend((s) => {
        s.append('file', file)
        return s
      })
    }
    if (formType === 'updatePayment') {
      fetchFile(fileId)
    }
  }, [apiFileFetch, fileId, formType])

  // Prevents the propagation in an item
  const preventClose = (e) => {
    e.stopPropagation()
  }

  const onFileSelect = async (name, file) => {
    setFormToSend((s) => {
      s.append(name, file)
      return s
    })
  }

  const onFileDelete = async (name) => {
    setFormToSend((s) => {
      s.delete(name)
      return s
    })
  }

  const onDeleteOffer = async () => {
    const url = `/applications/${applicationId}/offers/${data.id}`

    try {
      await apiCallApplicationsAdmin(url, 'DELETE')
      getApplicationById(applicationId)
    } catch (e) {
      // here goes the alert error activation
      console.error('ERROR on DELETE offer: ', e)
    } finally {
      onClose()
    }
  }

  const onDeleteContract = async () => {
    const url = `/applications/${applicationId}/offers/${data.offerId}/contracts/${data.id}`

    try {
      await apiCallApplicationsAdmin(url, 'DELETE')
      getApplicationById(applicationId)
    } catch (e) {
      // here goes the alert error activation
      console.error('ERROR on DELETE contract: ', e)
    } finally {
      onClose()
    }
  }

  const onSubmitOffer = async () => {
    // 1 - Convert numbers
    const newFormData = parseOfferForm(parseOfferNumericInputs(formData))
    // 2 - Delete file from this formdata
    delete newFormData.file
    delete newFormData.deployments[0].total_refund_amount
    delete newFormData.deployments[0].commission
    // 3 - Generate FormData to send
    const offerToSave = formToSend
    offerToSave.append('offer', JSON.stringify(newFormData))
    // 4 - Submit FormData
    const url = `/applications/${applicationId}/offers`
    try {
      await apiCallApplicationsAdminFormData(url, 'POST', offerToSave)
      getApplicationById(applicationId)
    } catch (e) {
      // here goes the alert error activation
      console.error('ERROR on POST offer: ', e)
    } finally {
      onClose()
    }
  }

  const onSubmitInvoiceOffer = async () => {
    // 1 - Convert numbers
    const body = parseInvoiceOfferForm(parseInvoiceOfferNumericInputs(formData))
    const url = `/applications/${applicationId}/invoice-financing/offer`
    try {
      await apiCallApplicationsAdmin(url, 'POST', body)
      getApplicationById(applicationId)
      onClose()
    } catch (e) {
      // here goes the alert error activation
      console.error('ERROR on POST offer: ', e)
    }
  }

  return (
    <>
      {panelAccount && (
        <section id="panel-account" className={'panel ' + panelAccount.type}>
          <div className="panel__blackout" onClick={onClose} />
          <div className="panel__container" onClick={preventClose}>
            <div className="panel__container--cell">
              <div className="panel__img--container">
                <div className="panel__main-title">
                  <b>
                    {formatMessage({
                      id: `components.panel.${formType}.${step}`,
                    })}
                  </b>
                </div>
                <div className="panel__close" onClick={onClose} />
              </div>
              {/* ------------------------------- */}
              {/* ------ SELECT OFFER FORM ------ */}
              {/* ------------------------------- */}

              {formType === 'selectOfferType' && (
                <SelectOfferType setFormType={setFormType} />
              )}

              {/* ------------------------------- */}
              {/* -------- IF OFFER FORM -------- */}
              {/* ------------------------------- */}

              {step === 0 && formType === 'createInvoiceOffer' && (
                <InvoiceFinanceOffer
                  formData={formData}
                  onSubmit={(form) => {
                    setFormData(form)
                    setStep(1)
                  }}
                  goBack={() => {
                    setFormData(data)
                    setFormType('selectOfferType')
                  }}
                />
              )}

              {/* ------------------------------- */}
              {/* ------ GROWTH OFFER FORM ------ */}
              {/* ------------------------------- */}

              {step === 0 && formType === 'createOffer' && (
                <OfferForm
                  formData={formData}
                  onSubmit={(form) => {
                    setFormData(form)
                    setStep(1)
                  }}
                  goBack={() => {
                    setFormData(data)
                    setFormType('selectOfferType')
                  }}
                  onFileSelect={(file) => onFileSelect('file', file)}
                  onFileDelete={() => onFileDelete('file')}
                />
              )}
              {((step === 1 && formType === 'createOffer') ||
                (step === 0 &&
                  (formType === 'viewOffer' ||
                    formType === 'viewContract'))) && (
                <ViewOffer
                  goNext={() => setStep((s) => s + 1)}
                  setSelectedDeploy={setSelectedDeploy}
                  formData={parseOfferNumericInputs(formData)}
                  type={formType === 'viewContract' ? 'contract' : 'offer'}
                  isConfirmation={formType === 'createOffer'}
                  onDelete={
                    formType === 'viewContract'
                      ? onDeleteContract
                      : onDeleteOffer
                  }
                  onSubmit={onSubmitOffer}
                  goBack={() => {
                    setStep(0)
                  }}
                  applicationId={applicationId}
                  onClose={onClose}
                />
              )}
              {step === 1 &&
                (formType === 'viewOffer' || formType === 'viewContract') && (
                  <ActivateDeploy
                    formData={activationData}
                    currency={formData.currency}
                    selectedDeploy={selectedDeploy}
                    goNext={(data) => {
                      setActivationData(data)
                      setSelectedDeploy((s) => ({
                        ...s,
                        monitoring_start_date: data.monitoring_start_date,
                        first_repayment_date: data.first_repayment_date,
                        scenarios: s.scenarios.map((scenario, n) => ({
                          ...scenario,
                          selected: scenario.id === data.scenario_id,
                          pos: n,
                        })),
                      }))
                      setStep((s) => s + 1)
                    }}
                    goBack={() => {
                      setStep((s) => s - 1)
                    }}
                  />
                )}
              {step === 2 &&
                (formType === 'viewOffer' || formType === 'viewContract') && (
                  <ConfirmDeployActivation
                    selectedDeploy={selectedDeploy}
                    activationData={activationData}
                    currency={formData.currency}
                    offerId={
                      formType === 'viewContract'
                        ? formData.offerId
                        : formData.id
                    }
                    onDelete={
                      formType === 'viewContract'
                        ? onDeleteContract
                        : onDeleteOffer
                    }
                    onSubmit={onSubmitOffer}
                    goBack={() => {
                      setStep((s) => s - 1)
                    }}
                    applicationId={applicationId}
                    onClose={onClose}
                  />
                )}
              {/* ------------------------------- */}
              {/* ------ INVOICE OFFER FORM ----- */}
              {/* ------------------------------- */}

              {((step === 1 && formType === 'createInvoiceOffer') ||
                (step === 0 &&
                  (formType === 'viewInvoiceOffer' ||
                    formType === 'viewInvoiceContract'))) && (
                <ViewInvoiceOffer
                  formData={parseInvoiceOfferNumericInputs(formData)}
                  isConfirmation={formType === 'createInvoiceOffer'}
                  goBack={() => {
                    setStep(0)
                  }}
                  onSubmit={onSubmitInvoiceOffer}
                  // onDelete={
                  //   formType === 'viewInvoiceContract'
                  //     ? onDeleteInvoiceContract
                  //     : onDeleteInvoiceOffer
                  // }
                  type={
                    formType === 'viewInvoiceContract' ? 'contract' : 'offer'
                  }
                  // goNext={() => setStep((s) => s + 1)}
                  // setSelectedDeploy={setSelectedDeploy}
                  // applicationId={applicationId}
                  // onClose={onClose}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

PanelForm.propTypes = {
  panelAccount: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default PanelForm
