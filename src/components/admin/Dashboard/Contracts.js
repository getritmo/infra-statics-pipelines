import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import translate from '../../../i18n/translate'
import Card from '../../Cards'
import { useIntl } from 'react-intl'
import Dialog from '../../Dialog/Dialog'
import LoadingMin from '../../Loading'
import ContractsIcon from 'components/UI/Icons/ContractsIcon'
import { useParams } from 'react-router-dom'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'
import { useSelector } from 'react-redux'

const Contracts = ({ onCardClick }) => {
  const { offers = [], contracts = [] } = useSelector(
    (state) => state.appData.application,
  )
  const company = useSelector((state) => state.appData.company)

  const [myContracts, setMyContracts] = useState([])
  const [openOverlay, setOpenOverlay] = useState(false)
  const [dialogProps, setDialogProps] = useState(undefined)

  const { applicationId } = useParams()
  const { formatMessage, formatDate } = useIntl()
  const { getApplicationById } = useAsyncActions()
  const { apiCallApplicationsAdminFormData, apiFileDownload } = useAPI()

  const inputFileRef = useRef(null)

  const handleOpenFileDialog = (e) => {
    e.stopPropagation()
    if (inputFileRef.current) inputFileRef.current.click()
  }

  useEffect(() => {
    const contracts = offers.reduce((acc, crt) => {
      if (crt.contracts) {
        if (crt.contracts.length) {
          crt.contracts.forEach((contract) => {
            acc.push({
              ...contract,
              offer: {
                ...crt,
              },
            })
          })
        } else {
          acc.push({
            is_active: false,
            offer: {
              ...crt,
            },
          })
        }
      }

      return acc
    }, [])

    setMyContracts(contracts)
  }, [contracts, offers])

  const uploadFile = async (fileType, inputFileRef, data) => {
    try {
      const formData = new FormData()
      formData.append(fileType, inputFileRef.current.files[0])

      const url = `/applications/${applicationId}/offers/${data.offer.id}/contracts`
      await apiCallApplicationsAdminFormData(url, 'POST', formData)
      inputFileRef.current.value = null
      setOpenOverlay(false)
      setDialogProps(undefined)
      getApplicationById(applicationId)
    } catch (e) {
      console.error('ERROR on POST file: ', e)
    }
  }

  const downloadFile = async (item) => {
    const url = `/admin/uploads/${item.id}`
    await apiFileDownload(url, 'GET', item.name)
  }

  const handleOpenConfirmationDialog = (e, inputFileRef, contract) => {
    if (e.target.files.length > 0) {
      setDialogProps({
        title: formatMessage(
          { id: 'components.dialog.createContract' },
          {
            offerId: contract.offer.id,
          },
        ),
        acceptLabel: formatMessage({ id: 'common.Create' }),
        cancelLabel: formatMessage({ id: 'common.Cancel' }),
        onCancel: () => {
          inputFileRef.current.value = null
          setOpenOverlay(false)
          setDialogProps(undefined)
        },
        onAccept: async () => {
          await uploadFile('file', inputFileRef, contract)
        },
      })
      setOpenOverlay(true)
    }
  }

  // Just in case all data is not fetched
  if (!company) {
    return (
      <section className="accounts__section admin">
        <h2 className="layout-app__title">
          <ContractsIcon classes="image-icon" />
          <span>{translate('views.company_item.contract_signal')}</span>
        </h2>
        <LoadingMin />
      </section>
    )
  }

  return (
    <section className="accounts__section admin">
      {openOverlay && (
        <Dialog
          title={dialogProps.title}
          acceptLabel={dialogProps.acceptLabel}
          cancelLabel={dialogProps.cancelLabel}
          disableClose
          onAccept={dialogProps.onAccept}
          onCancel={dialogProps.onCancel}
        />
      )}

      <h2 className="layout-app__title">
        <ContractsIcon classes="image-icon" />
        <span>{translate('views.company_item.contract_signal')}</span>
      </h2>

      {!myContracts?.length && (
        <div className="table__no-info">
          {translate('views.company_item.no_files')}
        </div>
      )}

      {myContracts.map((contract, contractIndex) => {
        return (
          <Card
            key={`contract-${contractIndex}`}
            title={`${company.name} ${formatMessage({
              id: 'common.Contract',
            })}`}
            subtitle={
              contract.is_accepted
                ? formatMessage({ id: 'views.company_item.contract.accepted' })
                : formatMessage({ id: 'views.company_item.contract.pending' })
            }
            data={contract}
            type="contract"
            color={contract.is_accepted ? 'green' : 'orange'}
            onClick={() => {
              onCardClick({
                ...contract.offer,
                files: contract.files,
                offerId: contract.offer.id,
                id: contract.id,
              })
            }}
            actionButton={!contract.is_accepted}
            actionButtonLabel={formatMessage({
              id: 'components.card.contract.chooseFile',
            })}
            actionButtonFunction={handleOpenFileDialog}
            inputFileRef={inputFileRef}
            onFileChange={(e, fileRef) =>
              handleOpenConfirmationDialog(e, fileRef, contract)
            }
            downloadFile={!!contract.files?.length}
            onFileDownload={() => downloadFile(contract.files[0])}
            inactive={!contract.is_active}
          >
            <span className="card__content--item">
              {formatMessage({
                id: `components.card.${
                  contract.is_accepted ? 'contract' : 'offer'
                }.id`,
              })}
              :&nbsp;&nbsp;
              {contract.is_accepted ? contract.id : contract.offer.id}
            </span>
            <span className="card__content--item">
              {formatMessage({ id: 'common.Currency' })}
              :&nbsp;&nbsp;{contract.offer.currency}
            </span>
            <span className="card__content--item">
              {formatMessage({ id: 'components.card.contract.deployNum' })}
              :&nbsp;&nbsp;{contract.offer.deployments.length}
            </span>
            <span className="card__content--item">
              {formatMessage({
                id: 'components.card.contract.firstDeployDate',
              })}
              :&nbsp;&nbsp;
              {formatDate(
                contract.offer.deployments[0]?.deploy_date || new Date(),
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                },
              )}
            </span>
          </Card>
        )
      })}
    </section>
  )
}

Contracts.propTypes = {
  onCardClick: PropTypes.func.isRequired,
}

export default Contracts
