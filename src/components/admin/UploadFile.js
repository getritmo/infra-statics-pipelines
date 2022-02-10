import React from 'react'
import { FormGroup } from 'reactstrap'

import Loading from '../../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import { useForm } from 'react-hook-form'
import translate from '../../i18n/translate'
import { useParams } from 'react-router-dom'
import useAPI from 'hooks/useAPI'
import { CustomButton } from 'components/UI'
import useAsyncActions from 'hooks/useAsyncActions'

export const UploadFile = ({ fileType }) => {
  const { register, errors, handleSubmit } = useForm()
  const { apiCallApplicationsFormData } = useAPI()

  const { applicationId } = useParams()
  const { getApplicationById } = useAsyncActions()

  const submit = async () => {
    const formElement = document.getElementById(fileType)
    const formData = new FormData()
    formData.append(fileType, formElement.files[0])

    try {
      const url = `/applications/${applicationId}/uploads/${fileType}`
      await apiCallApplicationsFormData(url, 'POST', formData)
      document.getElementById(fileType).value = ''
      getApplicationById(applicationId)
    } catch (e) {
      console.error(e)
    }
  }

  const submitChanges = (item) => {
    submit(item)
  }

  return (
    <div className="table ">
      <h2 className="layout-app__title--h3">
        <span>{translate('admin.uploads.title')}</span>
      </h2>

      <form
        id="form"
        onSubmit={handleSubmit(submitChanges)}
        content-type="multipart/form-data"
      >
        <div className="layout-app__grid-form">
          <FormGroup className={errors.file ? 'error' : ''}>
            {/*   <Label for="file">
                                        file
                                        <span>*</span>
                                    </Label> */}
            <input
              type="file"
              name={fileType}
              id={fileType}
              className="form-control file"
              defaultValue=""
              ref={register({
                required: translate('admin.payments.errors.file'),
              })}
            />
            {errors.file && (
              <div className="error error-message">
                {errors.file && errors.file.message}
              </div>
            )}
          </FormGroup>

          <div>
            <CustomButton type="submit" label={translate('common.Save')} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default withAuthenticationRequired(UploadFile, {
  Redirecting: () => <Loading />,
})
