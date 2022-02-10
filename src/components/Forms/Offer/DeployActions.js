import { CustomButton } from 'components/UI'
import React from 'react'
import { useIntl } from 'react-intl'

const DeployActions = ({ handleDeployActivation, disabled, loadingDeploy }) => {
  const { formatMessage } = useIntl()
  return (
    <div className={'rform__section--deployment-container'}>
      <CustomButton
        label={formatMessage({
          id: 'components.offerForm.activate',
        })}
        onClick={handleDeployActivation}
        size="small"
        variant={disabled ? 'outlined' : 'contained'}
        classes="rform__section--deployment-button"
        disabled={disabled || false}
        loading={loadingDeploy}
      />
    </div>
  )
}

export default DeployActions
