import React from 'react'
import FileComponent from 'components/UI/FileComponent'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import useAPI from 'hooks/useAPI'
import translate from 'i18n/translate'
import useAsyncActions from 'hooks/useAsyncActions'

const FinanceFilesContainer = ({
  viewMode = 'desktop',
  type = 'both',
  files = [],
}) => {
  const { apiCallApplications, apiFileDownload } = useAPI()

  const { saveApplication } = useAsyncActions()

  const applicationId = useSelector(
    (state) => state.appData.application.application_id,
  )

  const handleDeleteFile = async (fileId) => {
    try {
      const url = `/${applicationId}/uploads/${fileId}`
      await apiCallApplications(url, 'DELETE')
      let newApplicationData = await apiCallApplications('', 'GET')
      saveApplication(newApplicationData.application)
    } catch (e) {
      console.error('ERROR on DELETE file: ', e)
    }
  }

  const handleDownloadFile = async (file) => {
    const url = `/uploads/${file.id}`
    await apiFileDownload(url, 'GET', file.name)
  }

  return (
    <div className={classNames(`${viewMode}-view`)}>
      <div className="accounts__section--finance-files user-view">
        {files.length === 0 && (
          <span className="accounts__section--finance-files-empty accounts__no-accounts">
            {translate('components.financeFilesContainer.no_documents')}
          </span>
        )}
        {files.length > 0 && (
          <>
            <div className="accounts__section--files-container">
              <div className="accounts__section--finance-files-group user-view">
                {files.map((file) => (
                  <FileComponent
                    key={`${type}-file-${file.id}`}
                    icon={type === 'bankStatement' ? 'invoice' : 'offer'}
                    onDelete={() => handleDeleteFile(file.id)}
                    filename={file.name}
                    onDownload={() => handleDownloadFile(file)}
                    containerClasses={'finance-user-view'}
                    confirmDelete={true}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FinanceFilesContainer
