import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import Loading from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import Validator from '../components/Validator'
import SVGInline from 'react-svg-inline'
import StatusIcon from '../components/StatusIcon'
import { decode, inArray } from '../utils/userFunctions'
import translate from '../i18n/translate'
import { CustomButton } from 'components/UI'
import useAPI from 'hooks/useAPI'

export const ContractSignal = () => {
  const storeStatus = useSelector((state) => state.appData)
  const storeStatusApplication = storeStatus ? storeStatus.application : false

  const { apiFileDownload } = useAPI()

  let previousStepsDone = false
  let isContractSigned = false
  let isContractAvailable = false

  if (storeStatus) {
    // set the contract in different states
    isContractAvailable =
      storeStatusApplication.contracts[0] !== undefined
        ? storeStatusApplication.contracts[0].files[0] !== undefined
        : false
    isContractSigned =
      storeStatusApplication.contracts[0] !== undefined
        ? storeStatusApplication.contracts[0].is_accepted
        : false

    if (
      inArray(decode(storeStatusApplication.status), 3) &&
      inArray(decode(storeStatusApplication.status), 4) &&
      inArray(decode(storeStatusApplication.status), 5) &&
      inArray(decode(storeStatusApplication.status), 6) &&
      inArray(decode(storeStatusApplication.status), 7)
    ) {
      previousStepsDone = true
    }
  }

  const download = async (item) => {
    const url = `/uploads/${item.id}`
    await apiFileDownload(url, 'GET', item.name)
  }

  const submitContinue = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const url = '/verification-admins'
    document
      .querySelector('.menu-column__section a[href="' + url + '"]')
      .click()
  }

  return (
    <>
      <Container className="">
        <>
          <Breadcrumb
            previous={translate('views.contract_signal.breadcrumb.previous')}
            actual={translate('views.contract_signal.breadcrumb.current')}
          />

          <h1 className="layout-app__title">
            <SVGInline
              className="image-icon"
              svg={
                '<svg width="47px" height="48px" viewBox="0 0 47 48" version="1.1" xmlns="http://www.w3.org/2000/svg" className="image-icon"><defs><linearGradient x1="100%" y1="99.9958334%" x2="5.43323864%" y2="-5.30638844%" id="linearGradient-1"><stop stop-color="#000000" offset="0%"></stop><stop stop-color="#000000" offset="100%"></stop></linearGradient></defs><g transform="translate(0.415649, 0.701003)" fill="url(#linearGradient-1)" fill-rule="nonzero"><path d="M37.7652917,20.41335 L41.9189167,24.5689333 C43.5835,26.2335166 44.5,28.4483916 44.5,30.80035 C44.5,33.1542666 43.5835,35.3691416 41.9189167,37.0317666 L39.5336667,39.4170166 C37.8651667,41.087475 35.5974167,41.9981 33.284625,41.9981 C32.5639583,41.9981 31.8374167,41.909975 31.122625,41.72785 L24.295875,39.9868916 C24.0412917,39.9222666 23.8239167,39.7577666 23.69075,39.5325583 C23.2246667,38.7335583 22.7429167,36.822225 24.260625,35.3045166 C24.9342917,34.63085 25.8429583,34.3684333 26.728125,34.3096833 L18.3758333,25.9573916 C17.821625,25.4031833 17.516125,24.6648916 17.516125,23.8796 C17.516125,23.0943083 17.821625,22.357975 18.3758333,21.8018083 C19.5195,20.6561833 21.3857917,20.6561833 22.5294583,21.8018083 L24.726905,24.0000114 C24.8665978,23.7061716 25.0577961,23.4310122 25.3005,23.1883083 C26.2525758,22.229689 27.7129907,22.0718403 28.8370413,22.7147621 C28.9784425,22.3835343 29.1852494,22.0726423 29.4560833,21.8018083 C30.4108696,20.8453871 31.869303,20.687431 32.9904473,21.3279398 C33.1341636,20.9912066 33.3438535,20.6811632 33.6116667,20.41335 C34.7553333,19.2696833 36.6177083,19.2696833 37.7652917,20.41335 Z M34.9962083,21.7978916 C34.8101667,21.9839333 34.7083333,22.228725 34.7083333,22.4911416 C34.7083333,22.7098222 34.7804109,22.9162632 34.9109664,23.0855321 L35.048125,23.2406 L36.3787917,24.5708916 C36.7606667,24.9527666 36.7606667,25.5735583 36.3787917,25.9554333 C36.1888333,26.1453916 35.9381667,26.24135 35.6875,26.24135 C35.4368333,26.24135 35.1861667,26.1453916 34.99425,25.9554333 L32.2251667,23.18635 C31.8432917,22.804475 31.2225,22.804475 30.840625,23.18635 C30.488125,23.53885 30.4610096,24.0949239 30.7592788,24.478743 L30.855125,24.5876 L33.6097083,27.3419333 C33.9915833,27.7238083 33.9915833,28.3446 33.6097083,28.726475 C33.41975,28.914475 33.1690833,29.0104333 32.9184167,29.0104333 C32.66775,29.0104333 32.4170833,28.914475 32.2251667,28.7245166 L28.0715417,24.5708916 C27.6896667,24.1870583 27.0669167,24.190975 26.6850417,24.5708916 C26.3063956,24.9514895 26.3051292,25.5694085 26.6812425,25.9535325 L30.8386667,30.1110166 C31.2205417,30.4928916 31.2205417,31.1136833 30.8386667,31.4955583 C30.4567917,31.8774333 29.836,31.8774333 29.454125,31.4955583 L21.1449167,23.18635 C20.7630417,22.8064333 20.14225,22.804475 19.760375,23.18635 C19.3785,23.568225 19.3785,24.1890166 19.760375,24.5708916 L30.147375,34.9559333 C30.4685417,35.2771 30.5253333,35.7745166 30.288375,36.1603083 C30.0494583,36.5461 29.5814167,36.7184333 29.1466667,36.5774333 C28.3124167,36.3013083 26.358,35.9683916 25.6451667,36.6871 C25.0968333,37.2354333 25.141875,37.8425166 25.2456667,38.2067666 L31.6082917,39.830225 C33.9289167,40.4255583 36.445375,39.7381833 38.1471667,38.0344333 L40.5324167,35.6491833 C41.8288333,34.3527666 42.5416667,32.6313916 42.5416667,30.80035 C42.5416667,28.9693083 41.8288333,27.2498916 40.534375,25.953475 L36.38075,21.7978916 C35.998875,21.417975 35.3780833,21.4160166 34.9962083,21.7978916 Z M6.21658169,0.000819143469 L6.35131287,0.00292282851 L28.5978528,1.49091997 C29.2703966,1.535888 29.8025036,2.09892377 29.8267431,2.76029264 L29.8247106,2.89375316 L28.4811007,20.7790515 C28.3989201,21.1385087 28.097684,21.3182373 27.5773926,21.3182373 C27.0571011,21.3182373 26.7969554,21.0375428 26.7969554,20.4761538 L28.0432141,3.34540069 C28.0407443,3.25323387 28.0028535,3.19205438 27.9295417,3.16186222 L27.8679164,3.14502822 L7.01427871,1.72816875 C6.92211189,1.73063858 6.8609324,1.76848119 6.83074024,1.84177369 L6.81390624,1.90339112 L6.81390624,3.84570551 L15.2337394,3.84570551 C15.9307304,3.84570551 15.9624118,5.4555512 15.3287836,5.60190081 L15.2337394,5.61252028 L2.5758755,5.8007695 C2.48940635,5.8007695 2.41632382,5.85944051 2.3943649,5.93904553 L2.38762628,5.98901872 L2.38762628,33.032576 C2.38762628,33.1190451 2.44629728,33.1921276 2.5259023,33.2140866 L2.5758755,33.2208252 L22.4864151,33.2272949 C23.0343308,33.3704413 23.3082886,33.6745795 23.3082886,34.1397095 C23.3082886,34.6048395 23.0343308,34.8936787 22.4864151,35.006227 L1.81774454,35 C1.13658827,35 0.574426094,34.4804101 0.506816589,33.8167888 L0.5,33.6822555 L0.5,5.14965652 C0.5,4.46850025 1.01958991,3.90633807 1.68321115,3.83872856 L1.81774454,3.83191198 L4.7745374,3.83191198 L4.94855498,1.22978065 C4.99408776,0.550106838 5.54974652,0.0243047044 6.21658169,0.000819143469 Z M5.71058783,26.1578588 C5.72760556,25.5431122 6.70394131,25.362167 6.81990283,26.0077112 C6.97765568,26.8862327 7.0702743,27.8101599 7.4314869,28.6356704 C7.7935278,29.4631386 8.43990033,29.9451319 8.83070571,28.7149609 C8.98883505,28.2170041 9.80267408,28.1396713 9.9198404,28.7149609 C10.0583918,29.3953689 10.4751756,29.5195381 11.0937625,29.5190863 C11.435096,29.5188604 11.7764295,29.5184086 12.1178383,29.5178815 C13.1335558,29.5163002 14.1492733,29.5141165 15.1649908,29.5114057 C15.8930635,29.5095232 15.8917081,30.6390186 15.1651414,30.640901 C13.9884332,30.6439883 12.8117249,30.6465485 11.6350167,30.6480545 C10.8086026,30.6490334 9.92541258,30.7030986 9.33205103,30.0174196 C9.15803345,30.2087561 8.95976937,30.3728342 8.74749955,30.4882686 C7.60648338,31.1086627 6.80574649,30.0559731 6.41870609,29.1252689 C6.21042716,29.8367004 5.93061352,30.5262949 5.65117637,31.2121245 C5.38032339,31.8768701 4.28712252,31.5865898 4.56204168,30.9118293 C4.87739678,30.1378238 5.19508616,29.3593004 5.40705478,28.5492263 C5.61254763,27.7640765 5.68814852,26.9674058 5.71058783,26.1578588 Z M24.1140575,3.84570551 C24.7952138,3.84570551 25.357376,4.36529542 25.4249855,5.02891666 L25.4318021,5.16345005 L25.4310259,20.671545 C25.3990677,21.2168496 25.1047169,21.489502 24.5479736,21.489502 C23.9912304,21.489502 23.6942536,21.1855876 23.6570435,20.5777588 L23.6570435,5.91937727 C23.6570435,5.83290812 23.5984247,5.75982559 23.5187936,5.73786667 L23.4687942,5.73112805 L18.2412089,5.61252028 C17.5442179,5.61252028 17.5125365,4.00267459 18.1461647,3.85632498 L18.2412089,3.84570551 L24.1140575,3.84570551 Z M17.6672896,20.0099199 C17.9792562,20.0099199 18.2320373,20.2627763 18.2320373,20.5746676 C18.2320373,20.8865589 17.9792562,21.1394153 17.6672896,21.1394153 L17.6672896,21.1394153 L5.26451247,21.1394153 C4.95262116,21.1394153 4.69976481,20.8865589 4.69976481,20.5746676 C4.69976481,20.2627763 4.95262116,20.0099199 5.26451247,20.0099199 L5.26451247,20.0099199 Z M20.6672896,16.0728757 C20.9792562,16.0728757 21.2320373,16.3257321 21.2320373,16.6376234 C21.2320373,16.9495147 20.9792562,17.2023711 20.6672896,17.2023711 L20.6672896,17.2023711 L5.26451247,17.2023711 C4.95262116,17.2023711 4.69976481,16.9495147 4.69976481,16.6376234 C4.69976481,16.3257321 4.95262116,16.0728757 5.26451247,16.0728757 L5.26451247,16.0728757 Z M20.6672896,12.1358315 C20.9792562,12.1358315 21.2320373,12.3886879 21.2320373,12.7005792 C21.2320373,13.0124705 20.9792562,13.2653269 20.6672896,13.2653269 L20.6672896,13.2653269 L5.26451247,13.2653269 C4.95262116,13.2653269 4.69976481,13.0124705 4.69976481,12.7005792 C4.69976481,12.3886879 4.95262116,12.1358315 5.26451247,12.1358315 L5.26451247,12.1358315 Z M17.9540159,8.19878733 C18.2659072,8.19878733 18.5187636,8.45164368 18.5187636,8.76353499 C18.5187636,9.0754263 18.2659072,9.32828265 17.9540159,9.32828265 L17.9540159,9.32828265 L7.97778614,9.32828265 C7.66589483,9.32828265 7.41303848,9.0754263 7.41303848,8.76353499 C7.41303848,8.45164368 7.66589483,8.19878733 7.97778614,8.19878733 L7.97778614,8.19878733 Z" id="contract-sign-icon"></path></g></svg>'
              }
            />
            <span>{translate('views.contract_signal.title')}</span>
          </h1>

          {storeStatus && (
            <section className="accounts__section">
              <div className="layout-app__info">
                {/* Estado inicial */}
                {!previousStepsDone && !isContractAvailable && (
                  <>
                    <h2 className="layout-app__title--h2">
                      <div className="alert">
                        <StatusIcon status="alert" />
                        {translate('views.contract_signal.text1')}
                      </div>
                    </h2>
                    <p>{translate('views.contract_signal.text2')}</p>
                    <Validator status={storeStatusApplication} actual={8} />
                  </>
                )}

                {/* Estado tras aceptar la oferta */}
                {previousStepsDone && !isContractAvailable && (
                  <>
                    <h2 className="layout-app__title--h2">
                      <div className="pending">
                        <StatusIcon status="pending" />
                        {translate('views.contract_signal.text3')}
                      </div>
                    </h2>
                    <p>{translate('views.contract_signal.text4')}</p>
                  </>
                )}

                {/* Estado tras firma del contrato */}
                {isContractAvailable && !isContractSigned && (
                  <>
                    <h2 className="layout-app__title--h2">
                      <div className="accepted">
                        <StatusIcon status="accepted" />
                        {translate('views.contract_signal.text5')}
                      </div>
                      <p>{translate('views.contract_signal.text6')}</p>
                    </h2>
                  </>
                )}

                {/* Estado tras firma del contrato */}
                {isContractAvailable && isContractSigned && (
                  <>
                    <h2 className="layout-app__title--h2">
                      <div className="accepted">
                        <StatusIcon status="accepted" />
                        {translate('views.contract_signal.text7')}
                      </div>
                      <p>{translate('views.contract_signal.text8')}</p>
                    </h2>
                  </>
                )}

                {storeStatus.application.contracts.map((i) => {
                  return (
                    <div key={i} className="layout-app__file--container">
                      {i.files.map((j) => {
                        return (
                          <button
                            key={j}
                            className="layout-app__file"
                            onClick={() => {
                              download(j)
                            }}
                          >
                            <div className="layout-app__file--item contract-file" />
                            <div className="layout-app__file--name">
                              <span>
                                {/* {j.name} */}
                                {translate('views.contract_signal.text9')}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      </Container>
      <div className="company-details__submit">
        <CustomButton
          label={translate('views.contract_signal.text10')}
          onClick={submitContinue}
        />
      </div>
    </>
  )
}

export default withAuthenticationRequired(ContractSignal, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
