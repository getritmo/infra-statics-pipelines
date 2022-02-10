import { CustomButton } from 'components/UI'
import { MyAdvancesComponent } from 'components/user/MyAdvance/MyAdvancesComponent'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MyAdvanceMenu from '../../../views/admin/MyAdvance/MyAdvanceMenu'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const CompanyMyAdvances = () => {
  const {
    features,
    application: { company_id },
  } = useSelector((state) => state.appData)

  const { getFeaturesById } = useAsyncActions()
  const { apiCallApplicationsAdmin } = useAPI()

  const [activeFeature, setActiveFeature] = useState(
    features
      ? features.find((feature) => feature.name === 'myAdvance').enabled
      : false,
  )

  const handleEditFeature = async () => {
    try {
      let allFeatures = await apiCallApplicationsAdmin('/features', 'GET')
      let featureId = await allFeatures.find(
        (feature) => feature.name === 'myAdvance',
      ).id
      await apiCallApplicationsAdmin(`/features/flags/${company_id}`, 'PUT', {
        id: featureId,
        enabled: !activeFeature,
      })
      setTimeout(() => getFeaturesById(company_id, 'admin'), 1000)

      setActiveFeature((s) => !s)
    } catch (e) {
      console.error(`ERROR on PUT feature to ${!activeFeature}: `, e)
    }
  }

  return (
    <>
      <CustomButton
        color={activeFeature ? 'alert' : 'secondary'}
        label={activeFeature ? 'Desactivar' : 'Activar'}
        position={'left'}
        onClick={handleEditFeature}
      />
      <MyAdvanceMenu />

      <div className="table">
        <MyAdvancesComponent rol="admin" />
      </div>
    </>
  )
}

export default CompanyMyAdvances
