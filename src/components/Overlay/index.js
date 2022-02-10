import Overlay403 from './Overlay403'
import React from 'react'
import { useSelector } from 'react-redux'
import ConfirmOverlay from './ConfirmOverlay'
import GoogleAnalyticsOverlay from './GoogleAnalyticsOverlay'
import MercadoOverlay from './MercadoOverlay'
import OpenbankingUK from './OpenbankingUk'

const Overlay = () => {
  const {
    globalState: {
      overlay: { open, type },
    },
  } = useSelector((state) => state)

  if (!open) return null

  switch (type) {
    case 'confirm':
      return <ConfirmOverlay />
    case 'error403':
      return <Overlay403 />
    case 'GA':
      return <GoogleAnalyticsOverlay />
    case 'ML-MP':
      return <MercadoOverlay />
    case 'openbankingUk':
      return <OpenbankingUK />
    default:
      return null
  }
}

export default Overlay
