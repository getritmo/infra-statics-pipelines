import React, { useState, useRef, useEffect } from 'react'
import { closePanel, editPanel } from 'actions/global'
import { CustomButton } from 'components/UI'
import FileComponent from 'components/UI/FileComponent'
import translate from 'i18n/translate'
import { useSelector, useDispatch } from 'react-redux'
import useAPI from 'hooks/useAPI'
import { v4 } from 'uuid'
import useAsyncActions from 'hooks/useAsyncActions'

const FinanceUploads = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [filesArray, setFilesArray] = useState([])

  const inputFileRef = useRef(null)
  const errorRef = useRef(null)

  const dispatch = useDispatch()
  const { saveApplication } = useAsyncActions()

  const subtype = useSelector((state) => state.globalState.panel.subtype)
  const onCloseConfirmation = useSelector(
    (state) => state.globalState.panel.onCloseConfirmation,
  )
  const applicationId = useSelector(
    (state) => state.appData.application.application_id,
  )
  const { apiCallApplicationsFormData, apiCallApplications } = useAPI()

  useEffect(() => {
    // Set need to show dialog if already selected files
    if (filesArray.length > 0 && !onCloseConfirmation) {
      dispatch(
        editPanel({
          onCloseConfirmation: true,
        }),
      )
    }
    if (filesArray.length === 0 && onCloseConfirmation) {
      dispatch(
        editPanel({
          onCloseConfirmation: false,
        }),
      )
    }
  }, [filesArray, onCloseConfirmation, dispatch])

  useEffect(() => {
    // Scroll to error message if exists
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [error, errorRef])

  useEffect(() => {
    // Reset input once files have been stored
    inputFileRef.current.files = new DataTransfer().files
  }, [filesArray])

  const onDeleteFile = async (id) => {
    setFilesArray((s) => s.filter((item) => item.id !== id))
  }

  const onAddFile = (e) => {
    if (e.target.files.length > 0) {
      setFilesArray((s) => [
        ...s,
        ...Object.keys(e.target.files).map((key) => ({
          id: v4(),
          file: e.target.files[key],
        })),
      ])
    }
  }

  const uploadFiles = async () => {
    setLoading(true)
    setError(false)
    const formData = new FormData()
    const propName = subtype === 'bankStatement' ? 'bankStatement' : 'finance'

    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i].file
      formData.append(propName, file)
    }

    try {
      const url = `/applications/${applicationId}/uploads/${propName}`
      await apiCallApplicationsFormData(url, 'POST', formData)
      let newApplicationData = await apiCallApplications('', 'GET')
      saveApplication(newApplicationData.application)
      dispatch(closePanel())
    } catch (e) {
      setError(true)
      setLoading(false)
    }
  }

  const handleOpenFileDialog = () => {
    if (inputFileRef.current) inputFileRef.current.click()
  }

  return (
    <>
      <div className="panel__uploads--section">
        {translate(`components.panel.upload.${subtype}.content`)}
      </div>
      <div className="panel__uploads--section">
        <CustomButton
          label={translate('components.panel.upload.chooseFiles')}
          variant="outlined"
          position="left"
          onClick={handleOpenFileDialog}
        />
        <input
          ref={inputFileRef}
          type="file"
          className="hidden"
          multiple
          onChange={onAddFile}
        />
      </div>
      {filesArray.length === 0 ? (
        <h2 className="rform__section--title">
          <b>{translate('components.panel.upload.noSelectedFiles')}</b>
        </h2>
      ) : (
        <>
          <div className="panel__uploads--section files-container">
            <h2 className="rform__section--title">
              <b>
                {translate('components.panel.upload.selectedFiles', {
                  number: filesArray.length,
                })}
              </b>
            </h2>
            <div className="panel__uploads--files-container">
              {filesArray.map((item) => (
                <FileComponent
                  key={`${subtype}-file-${item.id}`}
                  icon={subtype === 'bankStatement' ? 'invoice' : 'offer'}
                  onDelete={() => onDeleteFile(item.id)}
                  filename={item.file.name}
                  loading={loading}
                />
              ))}
            </div>
          </div>
          <div className="panel__uploads--section">
            <CustomButton
              label={translate('components.panel.upload.uploadFiles')}
              onClick={uploadFiles}
            />
            <h4>{translate('components.panel.upload.secureTransfer')}</h4>
            {error && (
              <span
                ref={errorRef}
                className="panel__uploads--section-error finance-upload"
              >
                {translate('components.panel.upload.error')}
              </span>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default FinanceUploads
