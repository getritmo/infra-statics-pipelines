import React, { useState, useEffect } from 'react'
import { closeOverlay } from 'actions/global'
import { useDispatch, useSelector } from 'react-redux'
import { preventDefault } from 'data/data'
import { CustomText } from 'components/UI'
import { LoadingSize } from 'components/Loading'
import { useIntl } from 'react-intl'
import useAPI from 'hooks/useAPI'
const OpenbankingUK = () => {
  const { application_id } = useSelector((state) => state.appData.application)

  const [bankFilter, setBankFilter] = useState('')
  const [availableBanks, setAvailableBanks] = useState([])
  const [filteredBanks, setFilteredBanks] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const { apiCallApplications, apiCallCustom } = useAPI()
  const { formatMessage } = useIntl()

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        let response = await apiCallCustom(
          '/connections/integrations?platform=openbanking_uk',
          'GET',
        )
        setAvailableBanks(response)
        setFilteredBanks(response)
      } catch (e) {
        console.error('ERROR fetching banks: ', e)
      } finally {
        setLoading(false)
      }
    }
    fetchBanks()
  }, [apiCallCustom])

  useEffect(() => {
    if (bankFilter) {
      setFilteredBanks(
        availableBanks.filter((bank) =>
          bank.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(
              bankFilter
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase(),
            ),
        ),
      )
    } else {
      setFilteredBanks(availableBanks)
    }
  }, [bankFilter, availableBanks])

  const onCardClick = async (bankRef) => {
    try {
      let response = await apiCallApplications(
        `/${application_id}/connectors/openbanking_uk?integration=${bankRef}`,
        'GET',
      )
      localStorage.setItem('redirectUrl', 'finance-accounts')
      localStorage.setItem('connector', 'openbanking_uk')
      localStorage.setItem('bank', bankRef)
      window.location.href = response.auth_url
    } catch (e) {
      console.error(`ERROR starting ${bankRef} bank redirection`)
    }
  }

  const cancelAction = () => dispatch(closeOverlay())

  return (
    <div className="openbanking-overlay" onClick={cancelAction}>
      <div className="openbanking-overlay__container" onClick={preventDefault}>
        <div className="openbanking-overlay__close" onClick={cancelAction} />
        <CustomText
          title={formatMessage({
            id: 'components.overlay.openbanking_uk.bank',
          })}
          placeholder={formatMessage({
            id: 'components.overlay.openbanking_uk.placeholder',
          })}
          name="bankFilter"
          required={false}
          inputValue={bankFilter}
          setValue={(name, value) => setBankFilter(value)}
          classes={{ container: 'openbanking-overlay__filter' }}
        />
        {loading ? (
          <div className={'spinner__container'}>
            <LoadingSize size={40} />
          </div>
        ) : (
          <div className="openbanking-overlay__container--content">
            {filteredBanks.map((bank) => (
              <div
                key={bank.key}
                className="openbanking-overlay__card"
                onClick={() => onCardClick(bank.key)}
              >
                <img
                  key={bank.name}
                  src={bank.image_url}
                  height={'60%'}
                  width={'90%'}
                  className="openbanking-overlay__card--image"
                  alt={bank.name}
                />
                {bank.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OpenbankingUK
