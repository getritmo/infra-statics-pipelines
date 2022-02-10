import React, { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux'
import Dialog from 'components/Dialog/Dialog'
import moment from 'moment'
import { LoadingSize } from 'components/Loading'
import { formatDate, getFormat } from 'data/data'
import { TableLoader } from 'components/admin/TableLoader'
import { getActiveDeploys } from 'components/Forms/Payments/utils'
import { CustomButton } from 'components/UI'
import useAPI from 'hooks/useAPI'
import { openPanel } from 'actions/global'
import { setPayments } from 'actions/appData'
import useAsyncActions from 'hooks/useAsyncActions'
import useTableFilters from 'hooks/useTableFilters'

const CompanyPayments = () => {
  const {
    application: { offers },
    payments,
  } = useSelector((state) => state.appData)
  const dispatch = useDispatch()

  const [selectedPayments, setSelectedPayments] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState({})
  const [loading, setLoading] = useState(true)

  const { apiFileDownload, apiCallApplicationsAdmin } = useAPI()
  const { formatMessage } = useIntl()
  const { getPaymentsByApplicationId } = useAsyncActions()
  const { SelectColumnFilter, DateColumnFilter } = useTableFilters()

  useEffect(() => {
    getPaymentsByApplicationId(() => setLoading(false))
  }, [getPaymentsByApplicationId, dispatch])

  const download = useCallback(
    async (item) => {
      await apiFileDownload(`/admin/uploads/${item.id}`, 'GET', item.name) // url file method callback
    },
    [apiFileDownload],
  )

  const removeFromPayments = useCallback(
    (id) => {
      setSelectedPayments((s) => s.filter((e) => e !== id))
    },
    [setSelectedPayments],
  )

  const addIdToPayments = useCallback(
    (e, id) => {
      if (e.target.checked) {
        setSelectedPayments((s) => [...s, id])
      } else {
        removeFromPayments(id)
      }
    },
    [setSelectedPayments, removeFromPayments],
  )

  const updatePaymentStatus = async (id, newStatus) => {
    // If id doesnt exist, it does nothing
    setSelectedPayments((s) => s.filter((e) => e !== id))
    const paymentIndex = payments.findIndex(
      (payment) => payment.payment.id === id,
    )
    const updatedData = payments.slice()
    updatedData[paymentIndex].payment.status = newStatus
    dispatch(setPayments(updatedData))
  }

  const operatePaymentById = async (id, opType) => {
    return new Promise((resolve, reject) => {
      const url =
        opType === 'delete'
          ? `/payments/${id}`
          : `/applications/payments/${id}/confirmed`
      const method = opType === 'delete' ? 'DELETE' : 'PUT'

      Promise.resolve(
        apiCallApplicationsAdmin(url, method, { payment_method: undefined }),
      )
        .then(() => {
          const newStatus = opType === 'delete' ? 'canceled' : 'processing'
          updatePaymentStatus(id, newStatus)
          resolve()
        })
        .catch((err) => {
          console.error(
            `ERROR while payment ${id} was being set to ${opType.toUpperCase()} state: `,
            err,
          )
          updatePaymentStatus(id, 'to_review')
          reject()
        })
    })
  }

  const onDialogAccept = async (opType) => {
    selectedPayments.forEach((paymentId) =>
      updatePaymentStatus(paymentId, 'loading'),
    )
    setOpenDialog(false)
    for (let i = 0; i < selectedPayments.length; i++) {
      await operatePaymentById(selectedPayments[i], opType)
    }
    getPaymentsByApplicationId()
  }

  const openActionDialog = (opType) => {
    setDialogProps({
      title: formatMessage(
        {
          id: `components.dialog.${
            selectedPayments.length > 1 ? 'manyItems' : 'oneItem'
          }`,
        },
        {
          action: formatMessage({ id: `components.dialog.${opType}Action` }),
          type: formatMessage({
            id: `components.dialog.${
              selectedPayments.length > 1 ? 'manyPayments' : 'payment'
            }`,
          }),
          id: <b>{selectedPayments[0]}</b>,
        },
      ),
      acceptLabel: formatMessage({ id: `components.dialog.${opType}` }),
      cancelLabel: formatMessage({ id: 'common.Cancel' }),
      onCancel: () => {
        setOpenDialog(false)
        setDialogProps(undefined)
      },
      onAccept: async () => onDialogAccept(opType),
    })
    setOpenDialog(true)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: formatMessage({ id: 'components.table_loader.header.id' }),
        accessor: 'payment.id',
        sortType: 'basic',
        Cell: (props) => {
          if (props.row.original.payment.status === 'to_review') {
            return (
              <CustomButton
                label={props.row.values.payment.id}
                variant="link"
                onClick={async () => {
                  const {
                    invoice: {
                      id_deployment,
                      start_date,
                      end_date,
                      name: invoice_number,
                      id: payment_id,
                    },
                    payment: { amount_cents: quantity },
                    upload: { name: fileName, format, id },
                  } = props.row.original

                  // Get deployment
                  const activeDeployments = getActiveDeploys(offers)
                  const selectedDeployment = activeDeployments.find(
                    (deploy) => deploy.id === id_deployment,
                  )

                  const revenue_share = selectedDeployment.revenue_share / 100
                  const outstanding_balance =
                    selectedDeployment?.scenarios?.find(
                      (scenario) => scenario.selected === true,
                    )?.outstanding_balance / 100 || 0

                  dispatch(
                    openPanel({
                      type: 'form',
                      subtype: 'payment',
                      mode: 'update',
                      formData: {
                        currency: selectedDeployment.currency,
                        end_date: moment(new Date(end_date)).format(
                          'YYYY-MM-DD',
                        ),
                        id_deployment,
                        income: (revenue_share * quantity) / 100,
                        invoice: `${fileName}.${format}`,
                        invoice_number,
                        offerId: '',
                        outstanding_balance,
                        quantity: quantity / 100,
                        revenue_share,
                        start_date: moment(new Date(start_date)).format(
                          'YYYY-MM-DD',
                        ),
                      },
                      fileId: id,
                      paymentId: payment_id,
                    }),
                  )
                }}
              />
            )
          } else {
            return <span>{props.row.values.payment.id}</span>
          }
        },
      },
      {
        Header: formatMessage({
          id: 'components.table_loader.header.company_name',
        }),
        accessor: (d) => `${d.id_company} - ${d.company_name}`,
        sortType: 'basic',
      },
      {
        Header: formatMessage({ id: 'components.table_loader.header.status' }),
        accessor: 'payment.status',
        sortType: 'basic',
        Filter: SelectColumnFilter,
        filter: 'includes',
        Cell: (props) => (
          <div className={'table__status ' + props.value}>
            {props.value === 'to_review' && (
              <span className="checkbox__container payment-cell">
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked={
                    selectedPayments.indexOf(props.row.values.payment.id) !== -1
                  }
                  value={1}
                  onClick={(e) => {
                    addIdToPayments(e, props.row.values.payment.id)
                  }}
                  id={'payment-' + props.row.values.payment.id}
                  data-id={props.row.values.payment.id}
                />
                <label
                  htmlFor={'payment-' + props.row.values.payment.id}
                  className={'table-checkbox'}
                >
                  {formatMessage({
                    id: `components.table_loader.select_filter.${props.value}`,
                  })}
                </label>
              </span>
            )}
            {props.value === 'loading' && <LoadingSize size={24} />}
            {props.value !== 'to_review' &&
              props.value !== 'loading' &&
              formatMessage({
                id: `components.table_loader.select_filter.${props.value}`,
              })}
          </div>
        ),
      },
      {
        Header: formatMessage({ id: 'components.table_loader.header.period' }),
        accessor: 'invoice',
        sortType: 'basic',
        Filter: DateColumnFilter,
        id: 'payment.period',
        filter: 'date',
        Cell: (props) => (
          <div className="table__field--period">
            {formatDate(props.row.original.invoice.period_start, 'invoice')} -{' '}
            {formatDate(props.row.original.invoice.period_end, 'invoice')}
          </div>
        ),
      },

      {
        Header: formatMessage({ id: 'components.table_loader.header.amount' }),
        accessor: 'payment',
        sortType: 'basic',

        Cell: (props) => (
          <div className={'table__status ' + props.value}>
            <b>
              {getFormat(
                props.row.values.payment.amount_cents / 100,
                'eur',
                true,
                props.row.values.payment.currency,
              )}
            </b>
          </div>
        ),
      },

      {
        Header: formatMessage({ id: 'components.table_loader.header.date' }),
        accessor: 'payment.created_at',
        sortType: 'basic',
        Filter: DateColumnFilter,
        id: 'payment.created_at',
        filter: 'date',
        Cell: (props) => (
          <div className="table__status ">
            {formatDate(props.row.original.payment.created_at, 'invoice')}
          </div>
        ),
      },
      {
        Header: formatMessage({ id: 'components.table_loader.header.invoice' }),
        accessor: 'upload',
        sortType: 'basic',
        Cell: (props) => (
          <button
            className="layout-app__file"
            onClick={() => {
              download({
                id: props.row.values.upload.id,
                name: props.row.values.upload.name,
              })
            }}
          >
            <div className="layout-app__file--item invoice-file" />
            <div className="layout-app__file--name">
              <span>{props.row.values.upload.name}</span>
            </div>
          </button>
        ),
      },
    ],
    [
      dispatch,
      download,
      selectedPayments,
      addIdToPayments,
      offers,
      formatMessage,
      SelectColumnFilter,
      DateColumnFilter,
    ],
  )

  if (loading)
    return (
      <div className={'spinner__container--top-center'}>
        <LoadingSize size={60} />
      </div>
    )

  return (
    <>
      {openDialog && (
        <Dialog
          title={dialogProps.title}
          acceptLabel={dialogProps.acceptLabel}
          cancelLabel={dialogProps.cancelLabel}
          disableClose
          onAccept={dialogProps.onAccept}
          onCancel={dialogProps.onCancel}
        >
          {selectedPayments.length > 1 && (
            <ul className="payments__dialog--list">
              {selectedPayments.map((payment) => (
                <li key={`payment-${payment}`}>{payment}</li>
              ))}
            </ul>
          )}
        </Dialog>
      )}

      {selectedPayments.length > 0 && (
        <div className="payments right">
          <div className="payments__message">
            <b>{selectedPayments.length}</b>
            <span> payments </span>
            <b>selected</b>
          </div>
          <div>
            <CustomButton
              type="submit"
              label={formatMessage({ id: 'common.Delete' })}
              color="alert"
              classes="payments__button remove"
              onClick={() => openActionDialog('delete')}
            />
            <CustomButton
              type="submit"
              label={formatMessage({ id: 'common.Process' })}
              onClick={() => openActionDialog('confirm')}
            />
          </div>
        </div>
      )}
      {payments?.length > 0 && (
        <TableLoader columns={columns} data={payments} />
      )}
    </>
  )
}

export default CompanyPayments
