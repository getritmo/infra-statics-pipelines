import React, { useState } from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import Loading from '../components/Loading'
import { decode, inArray } from '../utils/userFunctions'
import { CompanyInfoForm } from '../components/CompanyInfoForm'
import SVGInline from 'react-svg-inline'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'
import translate from '../i18n/translate'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { CustomButton } from 'components/UI'
import useAsyncActions from 'hooks/useAsyncActions'

let preventMultiple = true

export const CompanyInfo = () => {
  const { application } = useSelector((state) => state.appData)

  const initialState = application
    ? inArray(decode(application.status), 6)
    : false
  const company_details = application?.stages?.company_details || false
  const [state, setState] = useState(initialState)
  const [redirectToOffer, setRedirectToOffer] = useState(false)

  const { formatMessage } = useIntl()
  const { saveApplication } = useAsyncActions()

  // TODO: Translate document titles.
  document.title = 'Your business information - RITMO App'

  const changeState = (e) => {
    e.preventDefault()
    setState(false)
  }
  // Action to continue to next page
  const submitContinue = () => {
    setRedirectToOffer(true)
  }

  if (!state && application) {
    if (preventMultiple) {
      preventMultiple = false

      setTimeout(() => {
        setState(inArray(decode(application.status), 6))
      }, 0)
    }
  }

  return (
    <Container className="company-details">
      <Breadcrumb
        previous={translate('views.company_info.breadcrumb.previous')}
        actual={translate('views.company_info.breadcrumb.current')}
      />

      <h1 className="layout-app__title">
        <SVGInline
          className="image-icon"
          svg={
            '<svg width="47px" height="48px" viewBox="0 0 47 48" version="1.1" xmlns="http://www.w3.org/2000/svg" className="image-icon"><defs><linearGradient x1="100%" y1="99.9958334%" x2="5.43323864%" y2="-5.30638844%" id="linearGradient-1"><stop stop-color="#000000" offset="0%"></stop><stop stop-color="#000000" offset="100%"></stop></linearGradient></defs><path d="M37.626742,18.1328368 L41.780367,22.2884201 C43.4449503,23.9530034 44.3614503,26.1678784 44.3614503,28.5198368 C44.3614503,30.8737534 43.4449503,33.0886284 41.780367,34.7512534 L39.395117,37.1365034 C37.726617,38.8069618 35.458867,39.7175868 33.1460753,39.7175868 C32.4254086,39.7175868 31.698867,39.6294618 30.9840753,39.4473368 L24.1573253,37.7063784 C23.902742,37.6417534 23.685367,37.4772534 23.5522003,37.2520451 C23.086117,36.4530451 22.604367,34.5417118 24.1220753,33.0240034 C24.795742,32.3503368 25.7044086,32.0879201 26.5895753,32.0291701 L18.2372836,23.6768784 C17.6830753,23.1226701 17.3775753,22.3843784 17.3775753,21.5990868 C17.3775753,20.8137951 17.6830753,20.0774618 18.2372836,19.5212951 C19.3809503,18.3756701 21.247242,18.3756701 22.3909086,19.5212951 L24.5883553,21.7194982 C24.7280481,21.4256584 24.9192464,21.150499 25.1619503,20.9077951 C26.1140261,19.9491758 27.574441,19.7913271 28.6984916,20.4342489 C28.8398928,20.103021 29.0466996,19.7921291 29.3175336,19.5212951 C30.2723199,18.5648739 31.7307533,18.4069178 32.8518976,19.0474266 C32.9956139,18.7106934 33.2053037,18.40065 33.473117,18.1328368 C34.6167836,16.9891701 36.4791586,16.9891701 37.626742,18.1328368 Z M34.8576586,19.5173784 C34.671617,19.7034201 34.5697836,19.9482118 34.5697836,20.2106284 C34.5697836,20.429309 34.6418612,20.63575 34.7724167,20.8050189 L34.9095753,20.9600868 L36.240242,22.2903784 C36.622117,22.6722534 36.622117,23.2930451 36.240242,23.6749201 C36.0502836,23.8648784 35.799617,23.9608368 35.5489503,23.9608368 C35.2982836,23.9608368 35.047617,23.8648784 34.8557003,23.6749201 L32.086617,20.9058368 C31.704742,20.5239618 31.0839503,20.5239618 30.7020753,20.9058368 C30.3495753,21.2583368 30.3224599,21.8144107 30.6207291,22.1982298 L30.7165753,22.3070868 L33.4711586,25.0614201 C33.8530336,25.4432951 33.8530336,26.0640868 33.4711586,26.4459618 C33.2812003,26.6339618 33.0305336,26.7299201 32.779867,26.7299201 C32.5292003,26.7299201 32.2785336,26.6339618 32.086617,26.4440034 L27.932992,22.2903784 C27.551117,21.9065451 26.928367,21.9104618 26.546492,22.2903784 C26.1678459,22.6709763 26.1665795,23.2888953 26.5426928,23.6730193 L30.700117,27.8305034 C31.081992,28.2123784 31.081992,28.8331701 30.700117,29.2150451 C30.318242,29.5969201 29.6974503,29.5969201 29.3155753,29.2150451 L21.006367,20.9058368 C20.624492,20.5259201 20.0037003,20.5239618 19.6218253,20.9058368 C19.2399503,21.2877118 19.2399503,21.9085034 19.6218253,22.2903784 L30.0088253,32.6754201 C30.329992,32.9965868 30.3867836,33.4940034 30.1498253,33.8797951 C29.9109086,34.2655868 29.442867,34.4379201 29.008117,34.2969201 C28.173867,34.0207951 26.2194503,33.6878784 25.506617,34.4065868 C24.9582836,34.9549201 25.0033253,35.5620034 25.107117,35.9262534 L31.469742,37.5497118 C33.790367,38.1450451 36.3068253,37.4576701 38.008617,35.7539201 L40.393867,33.3686701 C41.6902836,32.0722534 42.403117,30.3508784 42.403117,28.5198368 C42.403117,26.6887951 41.6902836,24.9693784 40.3958253,23.6729618 L36.2422003,19.5173784 C35.8603253,19.1374618 35.2395336,19.1355034 34.8576586,19.5173784 Z M26.2599344,-2.68585154e-12 C26.7727702,-2.68585154e-12 27.1954416,0.38604019 27.2532067,0.883378875 L27.2599344,1 L27.2599344,8.66622115 L37.2427377,4.49259725 C37.3649207,4.44151478 37.4960333,4.41521011 37.6284649,4.41521011 C38.1413008,4.41521011 38.5639721,4.8012503 38.6217372,5.29858899 L38.6284649,5.41521011 L38.6217372,15.6628242 C38.6217372,16.3942842 38.2906464,16.7600141 37.6284649,16.7600141 C36.9662834,16.7600141 36.6452311,16.3942842 36.665308,15.6628242 L36.6653894,6.99438914 L25.2742921,11.790028 L25.2742921,6.99438914 L12.3295896,12.0738947 L12.3295896,7.33455424 L2.55345388,11.3098188 L2.55345388,27.5369245 L20.0374503,27.536 C20.6999835,27.6168059 21.0312501,27.977013 21.0312501,28.6166211 C21.0312501,29.2562293 20.6999835,29.5506889 20.0374503,29.5 L1.36145029,29.5 C0.848614453,29.5 0.425943132,29.1139598 0.368178024,28.6166211 L0.361450292,28.5 L0.361450292,10.5172929 C0.361450292,10.1496129 0.562739515,9.81520786 0.879404267,9.6411143 L0.989114501,9.58919484 L11.6294288,5.32049747 C11.9706719,5.18359705 12.2060855,4.87226992 12.2497557,4.51355271 L12.2570931,4.39239938 L12.2570931,1 C12.2570931,0.487164161 12.6431332,0.0644928393 13.1404719,0.00672773132 L13.2570931,-2.68585154e-12 L26.2599344,-2.68585154e-12 Z M14.8201685,14.7418251 C15.0410824,14.7418251 15.2201685,14.9209112 15.2201685,15.1418251 L15.2201685,17.3049006 C15.2201685,17.5258145 15.0410824,17.7049006 14.8201685,17.7049006 L12.6570931,17.7049006 C12.4361792,17.7049006 12.2570931,17.5258145 12.2570931,17.3049006 L12.2570931,15.1418251 C12.2570931,14.9209112 12.4361792,14.7418251 12.6570931,14.7418251 L14.8201685,14.7418251 Z M8.89401756,14.7418251 C9.11493146,14.7418251 9.29401756,14.9209112 9.29401756,15.1418251 L9.29401756,17.3049006 C9.29401756,17.5258145 9.11493146,17.7049006 8.89401756,17.7049006 L6.73094207,17.7049006 C6.51002817,17.7049006 6.33094207,17.5258145 6.33094207,17.3049006 L6.33094207,15.1418251 C6.33094207,14.9209112 6.51002817,14.7418251 6.73094207,14.7418251 L8.89401756,14.7418251 Z M20.7463195,14.7418251 C20.9672334,14.7418251 21.1463195,14.9209112 21.1463195,15.1418251 L21.1463195,17.3049006 C21.1463195,17.5258145 20.9672334,17.7049006 20.7463195,17.7049006 L18.583244,17.7049006 C18.3623301,17.7049006 18.183244,17.5258145 18.183244,17.3049006 L18.183244,15.1418251 C18.183244,14.9209112 18.3623301,14.7418251 18.583244,14.7418251 L20.7463195,14.7418251 Z M26.6724705,14.7418251 C26.8933844,14.7418251 27.0724705,14.9209112 27.0724705,15.1418251 L27.0724705,17.3049006 C27.0724705,17.5258145 26.8933844,17.7049006 26.6724705,17.7049006 L24.509395,17.7049006 C24.2884811,17.7049006 24.109395,17.5258145 24.109395,17.3049006 L24.109395,15.1418251 C24.109395,14.9209112 24.2884811,14.7418251 24.509395,14.7418251 L26.6724705,14.7418251 Z M32.5986215,14.7418251 C32.8195354,14.7418251 32.9986215,14.9209112 32.9986215,15.1418251 L32.9986215,17.3049006 C32.9986215,17.5258145 32.8195354,17.7049006 32.5986215,17.7049006 L30.435546,17.7049006 C30.2146321,17.7049006 30.035546,17.5258145 30.035546,17.3049006 L30.035546,15.1418251 C30.035546,14.9209112 30.2146321,14.7418251 30.435546,14.7418251 L32.5986215,14.7418251 Z M24.8831788,1.76807078 L14.6805421,1.76807078 C14.4350822,1.76807078 14.2309337,1.94494594 14.1885978,2.17819514 L14.1805421,2.26807078 L14.1805421,9.0825239 L25.3831788,4.79492625 L25.3831788,2.26807078 C25.3831788,1.9919284 25.1593212,1.76807078 24.8831788,1.76807078 Z" fill="url(#linearGradient-1)" fill-rule="nonzero"></path></svg>'
          }
        />
        <span>{translate('views.company_info.complete_details')}</span>
      </h1>

      <div className={'layout-app__text'}>
        {translate('views.company_info.confirm_details')}
      </div>

      {redirectToOffer && <Redirect to="/offer" />}

      {application && (
        <>
          {state && (
            <>
              <br />
              <div className="company-details__details">
                <h3 className="company-details__title">
                  {company_details.legal_name}
                </h3>
                <p className="text-1">
                  <b>{company_details.fiscal_id}</b>
                  <br />
                  {company_details.address}
                  <br />
                  {company_details.address_extra !== '' && (
                    <>
                      {company_details.address_extra}
                      <br />
                    </>
                  )}
                  {company_details.city}
                  <br />
                  {company_details.zip && <>{company_details.zip}</>}
                  {company_details.zip && company_details.country && (
                    <>&nbsp;-&nbsp;</>
                  )}
                  {company_details.country && (
                    <>
                      {formatMessage({
                        id: `data.countries.${company_details.country}`,
                      })}
                    </>
                  )}
                </p>
                <br />

                <a
                  href="/company-details"
                  className="link"
                  onClick={changeState}
                >
                  {translate('views.company_info.edit_info')}
                </a>
              </div>

              <div className="company-details__submit">
                <CustomButton
                  label={translate('common.Continue')}
                  onClick={submitContinue}
                />
              </div>
            </>
          )}

          {!state && (
            <>
              <CompanyInfoForm
                setState={setState}
                updateStatus={(data) => saveApplication(data)}
                status={application}
              />
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default withAuthenticationRequired(CompanyInfo, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})