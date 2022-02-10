import React, { useState } from 'react'

import { Form, FormGroup, Label, Container, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import UpdateStatus from '../components/user/UpdateStatus'
import { useIntl } from 'react-intl'

import Title from './Title'
import translate from '../i18n/translate'
import { countries } from 'data/countries'
import { CustomButton } from './UI'

const fieldsChanged = []
const enOrder = ['GB', 'ES', 'MX', 'FR']
const esOrder = ['ES', 'MX', 'GB', 'FR']

export const CompanyInfoForm = (props) => {
  const [postStatus, setPostStatus] = useState(false)
  const { register, errors, handleSubmit } = useForm()

  const { formatMessage, locale } = useIntl()

  const company_details = props.status
    ? props.status.stages.company_details
    : ''

  const initialLegalName = {
    value: company_details.legal_name,
    isActive: company_details.legal_name,
  }
  const initialFiscalId = {
    value: company_details.fiscal_id,
    isActive: company_details.fiscal_id,
  }
  const initialCity = {
    value: company_details.city,
    isActive: company_details.city,
  }
  const initialAdress = {
    value: company_details.address,
    isActive: company_details.address,
  }
  const initialAdressExtra = {
    value: company_details.address_extra,
    isActive: company_details.address_extra,
  }
  const initialProvince = {
    value: company_details.province,
    isActive: company_details.province,
  }
  const initialZip = {
    value: company_details.zip,
    isActive: company_details.zip,
  }
  const initialCountry = {
    value: company_details.country,
    isActive: company_details.country,
  }

  const [changes, setChanges] = useState('')
  const [legalName, setLegalName] = useState(initialLegalName)
  const [fiscalId, setFiscalId] = useState(initialFiscalId)
  const [address, setAddress] = useState(initialAdress)
  const [addressExtra, setAddressExtra] = useState(initialAdressExtra)
  const [city, setCity] = useState(initialCity)
  const [province, setProvince] = useState(initialProvince)
  const [country, setCountry] = useState(initialCountry)
  const [zip, setZip] = useState(initialZip)

  const handleFloatingLabel = (e) => {
    const id = e.target.getAttribute('id')
    const value = e.target.value
    const type = e.nativeEvent.focus
    const isActive = type === 'focus' ? true : value !== ''
    updateState(id, isActive, value)
  }

  const handleInputChange = (e) => {
    const id = e.target.getAttribute('id')
    const value = e.target.value
    const isActive = value !== ''
    updateState(id, isActive, value)
    checkChanges(id, value)
  }

  const updateState = (id, isActive, value) => {
    switch (id) {
      case 'legal_name':
        setLegalName({
          isActive,
          value,
        })
        break
      case 'fiscal_id':
        setFiscalId({
          isActive,
          value,
        })
        break
      case 'address':
        setAddress({
          isActive,
          value,
        })
        break
      case 'address_extra':
        setAddressExtra({
          isActive,
          value,
        })
        break
      case 'city':
        setCity({
          isActive,
          value,
        })
        break
      case 'province':
        setProvince({
          isActive,
          value,
        })
        break
      case 'country':
        setCountry({
          isActive,
          value,
        })
        break
      case 'zip':
        setZip({
          isActive,
          value,
        })
        break
      default:
    }
  }

  const checkChanges = (id, value) => {
    fieldsChanged[id] = value
    let changesDone = false

    for (const key in fieldsChanged) {
      if (company_details[key] !== fieldsChanged[key]) {
        changesDone = true
        break
      }
    }

    if (changesDone) {
      setChanges('')
    } else {
      setChanges('disabled')
    }
  }

  const statusToUpdate = props.status
  const submitChanges = () => {
    for (const key in fieldsChanged) {
      statusToUpdate.stages.company_details[key] = fieldsChanged[key]
    }

    // Triggers the AJAX CALL TO update Gateway
    setPostStatus(true)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitChanges)}>
        <Container>
          <Title tag="H2" className="title-h2">
            {translate('common.Details')}
          </Title>
          <Row>
            <div className="col-2">
              <FormGroup
                className={
                  (legalName.isActive ? 'active' : '') +
                  ' ' +
                  (errors.legal_name ? 'error' : '')
                }
              >
                <Label for="legal_name">
                  {translate('components.company_info_form.company_name')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="legal_name"
                  id="legal_name"
                  className="form-control"
                  defaultValue={legalName.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({ required: true })}
                />
                {errors.legal_name && (
                  <div className="error error-message">
                    {translate('components.company_info_form.fill_field')}
                  </div>
                )}
              </FormGroup>
            </div>
            <div className="col-2">
              <FormGroup
                className={
                  (fiscalId.isActive ? 'active' : '') +
                  ' ' +
                  (errors.fiscal_id ? 'error' : '')
                }
              >
                <Label for="fiscal_id">
                  {translate('components.company_info_form.tax_number')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="fiscal_id"
                  id="fiscal_id"
                  className="form-control"
                  defaultValue={fiscalId.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({
                    required: 'Por favor rellena este campo',
                    minLength: {
                      value: 8,
                      message: 'El Número fiscal tiene min 8 digitos',
                    },
                  })}
                />
                {errors.fiscal_id && (
                  <div className="error error-message">
                    {errors.fiscal_id && errors.fiscal_id.message}
                  </div>
                )}
              </FormGroup>
            </div>
          </Row>
          <Title tag="H2" className="title-h2">
            {translate('components.company_info_form.fiscal_address')}
          </Title>
          <Row>
            {' '}
            {/* DIRECCION */}
            <div className="col-2">
              <FormGroup
                className={
                  (address.isActive ? 'active' : '') +
                  ' ' +
                  (errors.address ? 'error' : '')
                }
              >
                <Label for="address">
                  {translate('common.Address')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                  defaultValue={address.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({ required: true })}
                />

                {errors.address && (
                  <div className="error error-message">
                    {translate('components.company_info_form.fill_field')}
                  </div>
                )}
              </FormGroup>
            </div>
            <div className="col-2">
              {/* DIRECCION EXTRA */}
              <FormGroup className={addressExtra.isActive ? 'active' : ''}>
                <Label for="address_extra">
                  {translate('components.company_info_form.aditional_address')}
                </Label>
                <input
                  type="text"
                  name="address_extra"
                  id="address_extra"
                  className="form-control"
                  defaultValue={addressExtra.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                />
              </FormGroup>
            </div>
          </Row>
          <Row>
            <div className="col-2">
              {/* CIUDAD */}
              <FormGroup
                className={
                  (city.isActive ? 'active' : '') +
                  ' ' +
                  (errors.city ? 'error' : '')
                }
              >
                <Label for="city">
                  {translate('common.City')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="form-control"
                  defaultValue={city.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({ required: true })}
                />
                {errors.city && (
                  <div className="error error-message">
                    {translate('components.company_info_form.fill_field')}
                  </div>
                )}
              </FormGroup>
            </div>
            <div className="col-2">
              {/* PROVINCIA */}
              <FormGroup
                className={
                  (province.isActive ? 'active' : '') +
                  ' ' +
                  (errors.province ? 'error' : '')
                }
              >
                <Label for="province">
                  {translate('common.Province')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="province"
                  id="province"
                  className="form-control"
                  defaultValue={province.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({ required: true })}
                />
                {errors.province && (
                  <div className="error error-message">
                    {translate('components.company_info_form.fill_field')}
                  </div>
                )}
              </FormGroup>
            </div>
            <div className="col-2">
              <FormGroup
                className={
                  (zip.isActive ? 'active' : '') +
                  ' ' +
                  (errors.zip ? 'error' : '')
                }
              >
                <Label for="zip">
                  {translate('common.postal_code')}
                  <span>*</span>
                </Label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  className="form-control"
                  defaultValue={zip.value}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  ref={register({ required: true })}
                />
                {errors.zip && (
                  <div className="error error-message">
                    {translate('components.company_info_form.fill_field')}
                  </div>
                )}
              </FormGroup>
            </div>
            <div className="col-2">
              <FormGroup
                className={
                  (country.isActive ? 'active' : '') +
                  ' ' +
                  (errors.country ? 'error' : '')
                }
              >
                <Label for="country" className="active">
                  {translate('common.Country')}
                  <span>*</span>
                </Label>

                <select
                  type="select"
                  name="country"
                  className="form-control"
                  ref={register({ required: true })}
                  onChange={handleInputChange}
                  onBlur={handleFloatingLabel}
                  onFocus={handleFloatingLabel}
                  defaultValue={country.value}
                  id="country"
                  placeholder="Selecciona País"
                >
                  <option value="" style={{ display: 'none' }} />
                  {(locale === 'es-ES' ? esOrder : enOrder).map((countryId) => {
                    const country = countries.find(
                      (country) => country.id === countryId,
                    )
                    return (
                      <option
                        key={`top-country-${countryId}`}
                        value={countryId}
                      >
                        {country.emoji}&nbsp;&nbsp;
                        {formatMessage({
                          id: `data.countries.${countryId}`,
                        })}
                      </option>
                    )
                  })}
                  <hr />
                  {countries
                    .sort((a, b) =>
                      formatMessage({
                        id: `data.countries.${a.id}`,
                      }).localeCompare(
                        formatMessage({
                          id: `data.countries.${b.id}`,
                        }),
                      ),
                    )
                    .map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.emoji}&nbsp;&nbsp;
                        {formatMessage({
                          id: `data.countries.${country.id}`,
                        })}
                      </option>
                    ))}
                </select>

                {errors.country && (
                  <div className="error error-message">
                    {translate('components.company_info_form.select_country')}
                  </div>
                )}
              </FormGroup>
            </div>
          </Row>
        </Container>

        <div className="required-fields">
          <span>*</span>{' '}
          {translate('components.company_info_form.required_fields')}
        </div>

        <div className="company-details__submit">
          <CustomButton
            type="submit"
            label={translate('common.Save')}
            classes={changes}
          />
        </div>
      </Form>
      {postStatus && (
        <UpdateStatus
          // Prevents Multiple posting
          preventMultiplePost={0}
          setRedirectTo={props.setState}
          statusToUpdate={statusToUpdate}
        />
      )}
    </>
  )
}

export default CompanyInfoForm
