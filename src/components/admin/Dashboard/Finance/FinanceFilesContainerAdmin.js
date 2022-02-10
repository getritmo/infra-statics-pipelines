import React, { useRef, useState, useEffect } from 'react'
import useAPI from 'hooks/useAPI'
import { useParams } from 'react-router'
import PlusIcon from 'components/UI/Icons/PlusIcon'
import { CustomButton } from 'components/UI'
import FileComponent from 'components/UI/FileComponent'
import { v4 } from 'uuid'
import translate from 'i18n/translate'
import Dialog from 'components/Dialog/Dialog'
import { useIntl } from 'react-intl'
import useAsyncActions from 'hooks/useAsyncActions'

const FinanceFilesContainerAdmin = ({
  country,
  bankStatementFiles = [],
  financeDocumentsFiles = [],
}) => {
  const [bsFiles, setBsFiles] = useState(bankStatementFiles)
  const [fsFiles, setFsFiles] = useState(financeDocumentsFiles)
  const [openOverlay, setOpenOverlay] = useState(false)
  const [fileToDelete, setFileToDelete] = useState(null)

  const { apiCallApplications, apiFileDownload, apiCallApplicationsFormData } =
    useAPI()
  const { applicationId } = useParams()
  const { formatMessage } = useIntl()
  const { getApplicationById } = useAsyncActions()

  const bankStatementInputRef = useRef(null)
  const financeDocumentsInputRef = useRef(null)

  useEffect(() => {
    setBsFiles(bankStatementFiles)
  }, [bankStatementFiles])

  useEffect(() => {
    setFsFiles(financeDocumentsFiles)
  }, [financeDocumentsFiles])

  const handleDeleteFile = async (fileId) => {
    const url = `/${applicationId}/uploads/${fileId}`

    try {
      await apiCallApplications(url, 'DELETE')
      getApplicationById(applicationId)
      setOpenOverlay(false)
      setFileToDelete(null)
    } catch (e) {
      console.error('ERROR on DELETE file: ', e)
    }
  }

  const handleDownloadFile = async (file) => {
    const url = `/admin/uploads/${file.id}`
    await apiFileDownload(url, 'GET', file.name)
  }

  const handleUploadFiles = async (e, filetype = 'finance') => {
    const fileKeys = Object.keys(e.target.files)
    const filesArray = fileKeys.map((key) => ({
      id: v4(),
      name: e.target.files[Number(key)].name,
      loading: true,
    }))
    if (filetype === 'bankStatement') {
      setBsFiles((s) => [...s, ...filesArray])
    } else {
      setFsFiles((s) => [...s, ...filesArray])
    }

    const formData = new FormData()

    for (let i = 0; i < fileKeys.length; i++) {
      const file = e.target.files[fileKeys[i]]
      formData.append(filetype, file)
    }

    try {
      const url = `/applications/${applicationId}/uploads/${filetype}`
      await apiCallApplicationsFormData(url, 'POST', formData)
      getApplicationById(applicationId)
    } catch (e) {
      getApplicationById(applicationId)
      console.error('ERROR on POST file: ', e)
    } finally {
      if (bankStatementInputRef.current) {
        bankStatementInputRef.current.files = new DataTransfer().files
      }
      if (financeDocumentsInputRef.current) {
        financeDocumentsInputRef.current.files = new DataTransfer().files
      }
    }
  }

  return (
    <div className="accounts__section">
      {openOverlay && (
        <Dialog
          title={formatMessage(
            { id: 'admin.finance.dialog.title' },
            {
              filename: fileToDelete.name,
            },
          )}
          acceptLabel={formatMessage({ id: 'admin.finance.dialog.yes' })}
          cancelLabel={formatMessage({ id: 'admin.finance.dialog.no' })}
          disableClose
          onAccept={() => handleDeleteFile(fileToDelete.id)}
          onCancel={() => setOpenOverlay(false)}
        />
      )}

      <div className="accounts__section--finance-files">
        {country !== 'ES' && (
          <div className="accounts__section--finance-container">
            <div className="accounts__section--title">
              <span className="accounts__section--title-text">
                {bsFiles.length === 0
                  ? translate('admin.finance.no_bs_document')
                  : translate('admin.finance.bs_documents')}
              </span>

              <CustomButton
                label={<PlusIcon color="#fff" />}
                size={'small'}
                position={'right'}
                onClick={() => bankStatementInputRef.current.click()}
                classes={'btn-add'}
              />
              <input
                ref={bankStatementInputRef}
                type="file"
                hidden
                onChange={(e) => handleUploadFiles(e, 'bankStatement')}
                multiple
              />
            </div>

            <div className="accounts__section--finance-files-group admin-view">
              {bsFiles.map((file) => (
                <FileComponent
                  key={`bs-file-${file.id}`}
                  icon={'invoice'}
                  onDelete={() => {
                    setFileToDelete(file)
                    setOpenOverlay(true)
                  }}
                  filename={file.name}
                  onDownload={() => handleDownloadFile(file)}
                  loading={file.loading}
                />
              ))}
            </div>
          </div>
        )}
        <div className="accounts__section--finance-container">
          <div className="accounts__section--title">
            <span className="accounts__section--title-text">
              {fsFiles.length === 0
                ? translate('admin.finance.no_fs_document')
                : translate('admin.finance.fs_documents')}
            </span>
            <CustomButton
              label={<PlusIcon color="#fff" height={12} width={12} />}
              size={'small'}
              position={'right'}
              onClick={() => financeDocumentsInputRef.current.click()}
              classes={'btn-add'}
            />
            <input
              ref={financeDocumentsInputRef}
              type="file"
              hidden
              onChange={(e) => handleUploadFiles(e, 'finance')}
              multiple
            />
          </div>
          <div className="accounts__section--finance-files-group admin-view">
            {fsFiles.map((file) => (
              <FileComponent
                key={`fd-file-${file.id}`}
                icon={'offer'}
                onDelete={() => {
                  setFileToDelete(file)
                  setOpenOverlay(true)
                }}
                filename={file.name}
                onDownload={() => handleDownloadFile(file)}
                loading={file.loading}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinanceFilesContainerAdmin
