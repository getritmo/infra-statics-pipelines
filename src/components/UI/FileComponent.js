import classNames from 'classnames'
import { LoadingSize } from 'components/Loading'
import React, { useState } from 'react'
import Dialog from 'components/Dialog/Dialog'
import { useIntl } from 'react-intl'
const FileComponent = ({
  onDelete,
  onDownload = undefined,
  filename,
  loading = false,
  icon = 'offer',
  containerClasses,
  confirmDelete = false,
}) => {
  const [inOperation, setInOperation] = useState(false)
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const { formatMessage } = useIntl()

  const handleDelete = async () => {
    if (confirmDelete) {
      setOpenConfirmationDialog(true)
    } else {
      setInOperation(true)
      await onDelete()
      setInOperation(false)
    }
  }

  const handleDownload = async () => {
    setInOperation(true)
    await onDownload()
    setInOperation(false)
  }

  return (
    <div className="rform__item--file-container">
      {openConfirmationDialog && ( //This dialog is to close
        <Dialog
          title={formatMessage(
            { id: 'admin.finance.dialog.title' },
            {
              filename,
            },
          )}
          acceptLabel={formatMessage({ id: 'admin.finance.dialog.yes' })}
          cancelLabel={formatMessage({ id: 'admin.finance.dialog.no' })}
          disableClose
          onAccept={async () => {
            setInOperation(true)
            await onDelete()
            setInOperation(false)
            setOpenConfirmationDialog(false)
          }}
          onCancel={() => setOpenConfirmationDialog(false)}
        />
      )}

      <div
        className={classNames(
          `rform__item--file-icon-container ${containerClasses}`,
          {
            ['with-opacity']: loading || inOperation,
          },
        )}
      >
        {!(loading || inOperation) && (
          <span className="rform__item--file-delete" onClick={handleDelete} />
        )}
        <div
          className={classNames(`layout-app__file--item ${icon}-file`, {
            downloadable:
              typeof onDownload === 'function' && !loading && !inOperation,
          })}
          onClick={() => {
            if (typeof onDownload === 'function') handleDownload()
          }}
        />
        <div className="layout-app__file--name">
          <span>{filename}</span>
        </div>
      </div>
      <div className="rform__item--file-spinner">
        {(loading || inOperation) && <LoadingSize size={24} />}
      </div>
    </div>
  )
}

export default FileComponent
