import { editPanel } from 'actions/global'
import { CustomButton } from 'components/UI'
import FileComponent from 'components/UI/FileComponent'
import translate from 'i18n/translate'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAPI from 'hooks/useAPI'
import classNames from 'classnames'
import useAsyncActions from 'hooks/useAsyncActions'

const CsvUploads = () => {
  const [file, setFile] = useState(undefined)
  const [loading, setLoading] = useState(undefined)
  const [error, setError] = useState(undefined)
  const [result, setResult] = useState([])
  const [fileSent, setFileSent] = useState(false)

  const { apiCallApplicationsFormData } = useAPI()
  const { getPayments } = useAsyncActions()

  const {
    panel: { onCloseConfirmation },
  } = useSelector((state) => state.globalState)

  const dispatch = useDispatch()
  const inputFileRef = useRef(null)

  useEffect(() => {
    // Set need to show dialog if already selected files
    if (file && !onCloseConfirmation && !fileSent) {
      dispatch(
        editPanel({
          onCloseConfirmation: true,
        }),
      )
    }
    if (!file && onCloseConfirmation && !fileSent) {
      dispatch(
        editPanel({
          onCloseConfirmation: false,
        }),
      )
    }
  }, [file, onCloseConfirmation, dispatch, fileSent])

  const handleOpenFileDialog = () => {
    if (inputFileRef.current) inputFileRef.current.click()
  }

  const onDeleteFile = () => {
    setFileSent(false)
    setFile(undefined)
  }

  const onAddFile = (e) => {
    if (e.target.files.length > 0) {
      setError()
      let targetFile = e.target.files[0]
      const extension = targetFile.name.split('.').pop()
      if (extension === 'csv') {
        setFile(targetFile)
      } else {
        setError({
          type: 'extension',
          message: translate('components.panel.upload.wrong_extension', {
            expectedExtension: '.csv',
          }),
        })
      }
    }
  }

  const uploadFile = async () => {
    setLoading(true)
    setError(undefined)
    const formData = new FormData()
    formData.append('csv', file)
    try {
      let response = await apiCallApplicationsFormData(
        '/admin/import-invoices',
        'POST',
        formData,
      )
      setResult(response)
      getPayments()
    } catch (e) {
      switch (e.status) {
        case 400:
          setError({ type: 'fileError' })
          break
        default:
          setError({ type: 'badRequest' })
          break
      }
    } finally {
      setFileSent(true)
      dispatch(editPanel({ onCloseConfirmation: false }))
      setLoading(false)
    }
  }

  return (
    <div className="panel__uploads--section files-container">
      {!file ? (
        <>
          <h2 className="rform__section--title csv-upload">
            <b>{translate('components.panel.upload.noSelectedFiles')}</b>
            <div>
              {error?.type === 'extension' && (
                <span className="panel__uploads--section-error">
                  {error.message}
                </span>
              )}
            </div>
          </h2>
          <div className="panel__uploads--section csv-upload">
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
              onChange={onAddFile}
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="rform__section--title">
            <b>{translate('components.panel.upload.selectedFile')}</b>
          </h2>
          <FileComponent
            icon={'invoice'}
            onDelete={() => {
              setResult([])
              onDeleteFile()
            }}
            filename={file.name}
            loading={loading}
          />
          <div className="panel__uploads--section">
            <CustomButton
              label={translate('components.panel.upload.uploadFile')}
              onClick={uploadFile}
            />
            <div className={'panel__uploads--messages'}>
              {result.map((item, i) => (
                <h4
                  key={`row-${i}-invoice-${item.invoice}`}
                  className={classNames({
                    'panel__uploads--section-error': item.status === 'error',
                    'panel__uploads--section-success':
                      item.status === 'success',
                  })}
                >
                  {translate(`components.panel.upload.csv.${item.status}`, {
                    rowNumber: i,
                    detail: translate(
                      `components.panel.upload.csv.${item.details}`,
                    ),
                    invoice: item.invoice,
                  })}
                </h4>
              ))}
              {(error?.type === 'fileError' ||
                error?.type === 'badRequest') && (
                <h4 className="panel__uploads--section-error">
                  {translate(`components.panel.upload.csv.${error.type}`)}
                </h4>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CsvUploads
