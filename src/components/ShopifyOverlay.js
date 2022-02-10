import React from 'react'
import { useForm } from 'react-hook-form'
import { CustomButton } from './UI'

export const ShopifyOverlay = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    props.startShopifyConnection(data.store)
  }

  return (
    <div className="confirm" onClick={props.actionCancel}>
      <div className="confirm__container" onClick={props.stopPropagation}>
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="confirm__close" onClick={props.closeShopifyOverlay} />
          <h3 className="confirm__title">
            Conecta tu tienda de <b>Shopify</b>
          </h3>
          <div className="confirm__subtext">
            <p className="confirm__subtitle">
              Introduce el nombre de <b>tu tienda</b>
            </p>

            <div className="confirm__fields--container">
              <div className="confirm__fields ">
                <input
                  type="text"
                  ref={register({
                    required: 'Por favor rellena este campo',
                    minLength: {
                      value: 3,
                      message: 'El Número fiscal tiene min 8 digitos',
                    },
                  })}
                  name="store"
                  id="shopify-store"
                  className="confirm__fields--input form-control"
                  placeholder="mi-tienda"
                />
                <div className="confirm__fields--info">.myshopify.com</div>
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
              onClick={props.closeShopifyOverlay}
              classes={'confirm__btn'}
            />
            <CustomButton
              color="cancel"
              onClick={props.closeShopifyOverlay}
              classes={'confirm__btn'}
            />
            <button type="submit" className="confirm__btn btn btn-success">
              <span>Sí, quiero</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShopifyOverlay
