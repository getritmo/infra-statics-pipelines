import { CustomButton } from 'components/UI'
import React from 'react'
import translate from '../../i18n/translate'

const DefaultContent = ({ closePanel }) => {
  return (
    <>
      <p>
        {translate('components.default_content.p')}
        <br />
      </p>

      <br />

      <CustomButton onClick={closePanel} label={translate('common.Close')} />
    </>
  )
}

export default DefaultContent
