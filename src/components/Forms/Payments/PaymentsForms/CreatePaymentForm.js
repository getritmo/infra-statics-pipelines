import React, { useEffect, createRef, useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import {
  CustomFile,
  CustomSelect,
  CustomNumber,
  CustomButton,
  CustomText,
  CustomDate,
} from 'components/UI'
import classNames from 'classnames'
import useAPI from 'hooks/useAPI'
import { getActiveDeploys } from '../utils'
import { useSelector } from 'react-redux'

const blankFormData = {
  id_deployment: '',
  invoice: '',
  invoice_number: '',
  start_date: '',
  end_date: '',
  income: '',
  quantity: 0,
  revenue_share: 0,
  outstanding_balance: 0,
}

const CreatePaymentForm = ({
  onSubmit,
  onFileSelect = () => {},
  onFileDelete = () => {},
}) => {
  const { application_id, offers } = useSelector(
    (state) => state.appData.application,
  )
  const { formData = blankFormData, mode } = useSelector(
    (state) => state.globalState.panel,
  )

  const [haveFile, setHaveFile] = useState(formData.invoice?.length || false)
  const [loadingIncome, setLoadingIncome] = useState(false)
  const [originalIncome, setOriginalIncome] = useState(null)
  const [modifiedIncome, setModifiedIncome] = useState(null)
  const [showMessage, setShowMessage] = useState(false)

  const deployments = useMemo(() => getActiveDeploys(offers), [offers])

  // This is a hack to avoid rewrite income with API data coming
  // from edit view
  const [keepInitialData, setKeepInitialData] = useState(mode === 'update')
  const [count, setCount] = useState(0)

  const { formatMessage, formatNumber } = useIntl()
  const { apiCallApplications } = useAPI()

  const {
    handleSubmit,
    register,
    clearErrors,
    watch,
    getValues,
    setValue,
    errors,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: formData,
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const inputFileRef = createRef(null)

  const {
    id_deployment: deploymentId,
    start_date: startDate,
    end_date: endDate,
    income,
  } = watch()

  const showAll = !!deploymentId || keepInitialData

  const selectedDeployment = useMemo(
    () =>
      deployments.length > 0
        ? deployments.find((deploy) => deploy.id === deploymentId)
        : [],
    [deployments, deploymentId],
  )

  const currency = useMemo(
    () => selectedDeployment?.currency || '',
    [selectedDeployment],
  )

  useEffect(() => {
    // Recalculate revenue share any time selected deployment changes
    const revenueShare = selectedDeployment?.revenue_share / 100
    const outstandingBalance =
      selectedDeployment?.scenarios?.find(
        (scenario) => scenario.selected === true,
      )?.outstanding_balance / 100

    if (!Number.isNaN(revenueShare)) {
      setValue('revenue_share', revenueShare.toFixed(2))
    }
    if (!Number.isNaN(outstandingBalance)) {
      setValue('outstanding_balance', outstandingBalance.toFixed(2))
    }
    setValue('offerId', selectedDeployment?.offerId)
  }, [selectedDeployment, setValue, formatNumber])

  useEffect(() => {
    const calculateNextSunday = (date) => {
      const dayINeed = 7
      let searchedDate = date
      let currentDay = moment(date).isoWeekday()

      while (currentDay !== dayINeed) {
        searchedDate = moment(searchedDate).add(1, 'days')
        currentDay = moment(searchedDate).isoWeekday()
      }

      return searchedDate
    }

    // Found next sunday
    if (startDate) {
      const nextSunday = calculateNextSunday(startDate)
      setValue('end_date', moment(nextSunday).format('YYYY-MM-DD'))
      clearErrors('end_date')
    }
  }, [startDate, setValue, clearErrors])

  useEffect(() => {
    if (count > 1 && keepInitialData) setKeepInitialData(false)
  }, [count, keepInitialData])

  useEffect(() => {
    /* This effect makes an API call when: 
     - both, startDate and endDate exists,
     - start date is before or equal to en date
     - end date is before today
    */
    setCount((s) => s + 1)
    const datesExists = Boolean(startDate && endDate)
    const startBeforeEnd = moment(startDate).isSameOrBefore(moment(endDate))
    const endBeforeToday = moment(endDate).isBefore(moment(0, 'HH'))

    let fetchRevenue

    if (!keepInitialData && datesExists && startBeforeEnd && endBeforeToday) {
      if (!getValues('income')) setValue('income', ' ')
      // This a hack to avoid label and data overlap in number input
      setTimeout(() => {
        setValue(
          'income',
          formatMessage({ id: 'components.paymentForm.loading' }),
        )
        setLoadingIncome(true)
      }, 120)
      fetchRevenue = setTimeout(async () => {
        const url = `/${application_id}/insights/revenue/daily?period.gte=${startDate}&period.lte=${endDate}`
        try {
          let reponse = apiCallApplications(url, 'GET')
          if (reponse) setValue('income', reponse.summary_current.toFixed(2))
        } catch (e) {
          console.error('ERROR on GET income: ', e)
        } finally {
          setLoadingIncome(false)
        }
      }, 500)
    }

    return () => {
      if (fetchRevenue) clearTimeout(fetchRevenue)
    }
  }, [
    startDate,
    endDate,
    application_id,
    apiCallApplications,
    setValue,
    getValues,
    formatMessage,
    keepInitialData,
  ])

  useEffect(() => {
    // Recalculate quantity
    const revenueShare = selectedDeployment?.revenue_share / 100
    const outstandingBalance =
      selectedDeployment?.scenarios?.find(
        (scenario) => scenario.selected === true,
      )?.outstanding_balance / 100

    let quantity = parseFloat(
      (
        (Number(revenueShare) * Number(income?.toString().replace(',', '.'))) /
        100
      ).toFixed(2),
    )

    if (quantity > outstandingBalance) {
      //Recalculate Income:
      setOriginalIncome(getValues('income'))
      const newIncome = (100 * outstandingBalance) / revenueShare
      setModifiedIncome(newIncome.toFixed(2))
      setValue('income', newIncome.toFixed(2))
      quantity = parseFloat(outstandingBalance / 100)
      setShowMessage(true)
    }

    if (income !== modifiedIncome && showMessage) setShowMessage(false)

    if (income && revenueShare && !Number.isNaN(quantity)) {
      setValue('quantity', parseFloat(quantity).toFixed(2))
    } else {
      setValue('quantity', 0)
    }
  }, [
    modifiedIncome,
    showMessage,
    income,
    selectedDeployment,
    setValue,
    getValues,
  ])

  return (
    <div className="panel__content--scroll--wrapper">
      <form
        id="create-payment-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="rform__section--title">
          <b>{formatMessage({ id: 'components.paymentForm.paymentData' })}</b>
        </h2>
        <div
          className={classNames('rform__section--row', {
            'single-col': !showAll,
            'col-arrangement': !showAll,
          })}
        >
          <CustomSelect
            name="id_deployment"
            title={formatMessage({ id: 'components.paymentForm.idDeployment' })}
            defaultValue={formData.id_deployment}
            options={deployments || []}
            singleCol={!showAll}
            required
            {...{ register, getValues, setValue, errors }}
          />
          <CustomText
            name="invoice_number"
            title={formatMessage({
              id: 'common.invoice_number',
            })}
            defaultValue={formData.invoice_number}
            hidden={!showAll}
            required
            {...{ register, getValues, setValue, errors }}
          />
        </div>

        <div className="rform__section--row">
          <CustomDate
            name="start_date"
            title={formatMessage({
              id: 'components.paymentForm.startDate',
            })}
            min={selectedDeployment?.monitoring_start_date}
            defaultValue={formData.start_date}
            hidden={!showAll}
            required
            {...{ register, getValues, setValue, errors }}
          />
          <CustomDate
            name="end_date"
            min={
              watch('start_date') || selectedDeployment?.first_repayment_date
            }
            title={formatMessage({ id: 'components.paymentForm.endDate' })}
            defaultValue={formData.end_date}
            hidden={!showAll}
            required
            {...{ register, getValues, setValue, errors }}
          />
        </div>
        <div className="rform__section--row">
          <CustomNumber
            name="income"
            title={formatMessage({ id: 'common.Income' })}
            loading={loadingIncome}
            hidden={!showAll}
            required
            {...{ register, getValues, setValue, errors }}
          />
          <CustomNumber
            name="revenue_share"
            title={formatMessage({
              id: 'components.paymentForm.revenueShare',
            })}
            defaultValue={0}
            hidden={!showAll}
            readOnly
            {...{ register, getValues, setValue, errors }}
          />
        </div>
        <div className="rform__section--row">
          <CustomNumber
            name="quantity"
            title={formatMessage({ id: 'common.Quantity' })}
            defaultValue={0}
            hidden={!showAll}
            readOnly
            {...{ register, getValues, setValue, errors }}
          />
          <CustomNumber
            name="outstanding_balance"
            title={formatMessage({
              id: 'components.paymentForm.outstandingBalance',
            })}
            defaultValue={0}
            hidden={!showAll}
            readOnly
            {...{ register, getValues, setValue, errors }}
          />
        </div>
        {showMessage && (
          <div className="rform__section--row">
            <span className="rform__item--error">
              {formatMessage(
                { id: 'components.paymentForm.incomeModified' },
                {
                  originalIncome: formatNumber(originalIncome, {
                    style: 'currency',
                    currency: currency.toUpperCase(),
                    minimumFractionDigits: 2,
                  }),
                  modifiedIncome: formatNumber(modifiedIncome, {
                    style: 'currency',
                    currency: currency.toUpperCase(),
                    minimumFractionDigits: 2,
                  }),
                  quantity: formatNumber(getValues('quantity'), {
                    style: 'currency',
                    currency: currency.toUpperCase(),
                    minimumFractionDigits: 2,
                  }),
                },
              )}
            </span>
          </div>
        )}
        {deploymentId && (
          <>
            <div className="rform__section--separator" />
            <h2 className="rform__section--title">
              <b>
                {formatMessage({ id: 'components.offerForm.upload_files' })}
              </b>
            </h2>
            <div className="rform__section--row">
              <div className="rform__section--row single-col col-arrangement">
                <CustomFile
                  inputFileRef={inputFileRef}
                  name={'invoice'}
                  type="file"
                  title={formatMessage({ id: 'common.File' })}
                  defaultValue={formData.file}
                  onChange={(e) => {
                    setValue('invoice', e.target.files[0].name)
                    onFileSelect(e.target.files[0])
                    setHaveFile(true)
                  }}
                  required
                  hidden={haveFile}
                  {...{ register, setValue, getValues, errors, onFileSelect }}
                />
                {haveFile && (
                  <div className="rform__item--file-container">
                    <span
                      className="rform__item--file-delete"
                      onClick={() => {
                        onFileDelete()
                        setValue('invoice', '')
                        inputFileRef.current.value = ''
                        setHaveFile(false)
                      }}
                    />
                    <div className="rform__item--file-icon offer-file" />
                    <div className="rform__item--file-name">
                      <span>{getValues('invoice')}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* This hidden input stores the currency */}
            <CustomText
              name="currency"
              title="Hidden currency"
              defaultValue={selectedDeployment?.currency}
              hidden
              {...{ register, getValues, setValue, errors }}
            />
            <CustomButton
              type="submit"
              label={formatMessage({ id: 'common.Next' })}
              classes="rform__item--file-button"
            />
          </>
        )}
      </form>
    </div>
  )
}

CreatePaymentForm.propTypes = {
  /** onSubmit, function that will be executed when the form is submitted. In this case is go a step forward to
   confirmation view */
  onSubmit: PropTypes.func.isRequired,
  /** onFileSelect, callback function to execute when a new file is selected. */
  onFileSelect: PropTypes.func.isRequired,
  /** onFileSelect, callback function to execute when an existing file is deleted. */
  onFileDelete: PropTypes.func.isRequired,
}

export default CreatePaymentForm
