import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import translate from '../../i18n/translate'
import { useIntl } from 'react-intl'
import { countries } from '../../data/countries'
import { useSelector, useDispatch } from 'react-redux'
import { closeOverlay } from 'actions/global'
import { CustomButton } from 'components/UI'
import classNames from 'classnames'
import useAsyncActions from 'hooks/useAsyncActions'

export const MercadoOverlay = () => {
  const { formatMessage } = useIntl()
  const {
    globalState: {
      overlay: { connector },
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { startsConnection } = useAsyncActions()

  const [activeButton, setActiveButton] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  const data = {
    mercadolibre: 'Mercado libre',
    mercadopago: 'Mercado Pago',
  }

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const checkActiveButton = () => {
    setActiveButton(document.getElementById('store').value !== '')
  }

  let formData = []
  formData['mercadolibre'] = countries.filter(
    (country) => country.mercadoLibre === true,
  )
  formData['mercadopago'] = countries.filter(
    (country) => country.mercadoPago === true,
  )

  const onSubmit = () => {
    const store = document.getElementById('store').value
    if (store) {
      startsConnection(false, { connector, store })
    }
  }

  const handleCancel = () => dispatch(closeOverlay())

  return (
    <div className="confirm" onClick={handleCancel}>
      <div className="confirm__container" onClick={stopPropagation}>
        <div className="confirm__header">
          <img
            src={`/images/accounts/${connector}.png`}
            alt={connector}
            width={130}
          />
          <h3 className="confirm__title">
            {translate('components.mercado_overlay.title', {
              store: data[connector],
            })}
          </h3>
        </div>
        <form
          id="form"
          className="confirm__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="confirm__close" onClick={handleCancel} />
          <div className="confirm__subtext">
            <div className="confirm__fields--container">
              <div className="active select form-group">
                <label htmlFor="country" className="active">
                  {translate('common.Country')}
                  <span>*</span>
                </label>
                <select
                  id="store"
                  className="form-control"
                  onChange={() => {
                    checkActiveButton()
                  }}
                >
                  <option value={''}>
                    {formatMessage({ id: 'components.mercado_overlay.option' })}{' '}
                  </option>
                  {formData[connector].map((option) => {
                    return (
                      <option key={option.id} value={option.id}>
                        {`${option.emoji} ${formatMessage({
                          id: `data.countries.${option.id}`,
                        })}`}
                      </option>
                    )
                  })}
                </select>
              </div>
              {errors.store && (
                <div className="error error-message">
                  {errors.store && errors.store.message}
                </div>
              )}
            </div>
          </div>
          <div className="confirm__actions">
            <CustomButton
              color="cancel"
              label={translate('common.Cancel')}
              onClick={handleCancel}
              classes={'confirm__btn'}
            />

            <CustomButton
              type="submit"
              label={translate('common.Yes')}
              disabled={!activeButton}
              classes={classNames('confirm__btn', { disable: !activeButton })}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default MercadoOverlay
