import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import {
  CustomFile,
  CustomSelect,
  CustomButton,
  CustomNumber,
  CustomCheckbox,
} from '../../../../UI'
import DeploymentsArray from './DeploymentsArray'
import { useIntl } from 'react-intl'

const CreateOfferForm = ({
  formData,
  onSubmit,
  onFileSelect,
  onFileDelete,
}) => {
  const [haveFile, setHaveFile] = useState(false)
  const { formatMessage } = useIntl()
  const {
    handleSubmit,
    register,
    control,
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
  const inputFileRef = useRef(null)

  const file = watch('file')

  useEffect(() => {
    // Watch file to display/hidde icon id added/removed
    if (!haveFile && file) setHaveFile(true)
    if (haveFile && !file) setHaveFile(false)
  }, [file, haveFile])

  useEffect(() => {
    // This effect saves nameFile and file as blob in parent component
    // Necessary to go back to edit form from confirmation
    if (inputFileRef.current) {
      const fileArray = document.getElementById('file-input')
      fileArray.addEventListener(
        'change',
        function () {
          const { files } = fileArray
          if (files.length > 0) {
            setValue('file', files[0].name)
            onFileSelect(files[0])
          }
        },
        false,
      )
    }
  }, [inputFileRef, onFileSelect, setValue])

  return (
    <div className="panel__content--scroll--wrapper">
      <div className="panel__content--scroll">
        <form
          id="create-offer-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="rform__section--title">
            <b>{formatMessage({ id: 'common.Contract' })}</b>
          </h2>
          <div className="rform__section--row">
            <CustomSelect
              name="type"
              title={formatMessage({ id: 'common.Product' })}
              options={[
                {
                  value: 'marketing',
                  label: formatMessage({
                    id: 'components.offerForm.marketing',
                  }),
                },
                {
                  value: 'marketplace',
                  label: formatMessage({
                    id: 'components.offerForm.marketplace',
                  }),
                },
                {
                  value: 'inventory',
                  label: formatMessage({
                    id: 'components.offerForm.inventory',
                  }),
                },
              ]}
              required
              {...{ register, getValues, errors }}
            />
            <CustomSelect
              name="currency"
              title={formatMessage({ id: 'common.Currency' })}
              options={[
                {
                  value: 'EUR',
                  label: formatMessage({ id: 'components.offerForm.EUR' }),
                },
                {
                  value: 'GBP',
                  label: formatMessage({ id: 'components.offerForm.GBP' }),
                },
                {
                  value: 'MXN',
                  label: formatMessage({ id: 'components.offerForm.MXN' }),
                },
              ]}
              required
              {...{ register, getValues, errors }}
            />
          </div>
          <div className="rform__section--row">
            <CustomNumber
              name="grace_days"
              title={formatMessage({ id: 'components.offerForm.grace_period' })}
              defaultValue={formData.grace_days}
              step={1}
              required
              {...{ register, getValues, setValue, errors }}
            />
            <CustomCheckbox
              name="is_accepted"
              title={formatMessage({ id: 'components.offerForm.accepted' })}
              validate={{
                shouldBeTrue: (data) =>
                  data === 'true' ||
                  formatMessage({ id: 'components.offerForm.error.required' }),
              }}
              required
              {...{ register, getValues, setValue, errors }}
            />
          </div>
          <DeploymentsArray
            {...{
              register,
              watch,
              getValues,
              setValue,
              errors,
              control,
              formData,
            }}
          />
          <div className="rform__section--separator" />
          <h2 className="rform__section--title">
            <b>{formatMessage({ id: 'components.offerForm.upload_files' })}</b>
          </h2>
          <div className="rform__section--row single-col col-arrangement">
            <CustomFile
              inputFileRef={inputFileRef}
              name="file"
              type="file"
              title={formatMessage({ id: 'common.File' })}
              defaultValue={formData.file}
              hidden={haveFile}
              {...{ register, setValue, getValues, errors, onFileSelect }}
            />
            {haveFile && (
              <div className="rform__item--file-container">
                <span
                  className="rform__item--file-delete"
                  onClick={() => {
                    onFileDelete()
                    setValue('file', '')
                    inputFileRef.current.value = ''
                  }}
                />
                <div className="layout-app__file--item offer-file" />
                <div className="layout-app__file--name">
                  <span>{getValues('file')}</span>
                </div>
              </div>
            )}
          </div>
          <CustomButton
            type="submit"
            label={formatMessage({ id: 'common.Next' })}
            classes="rform__item--file-button"
          />
        </form>
      </div>
    </div>
  )
}

export default CreateOfferForm
