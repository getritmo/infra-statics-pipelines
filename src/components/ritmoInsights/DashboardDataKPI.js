import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { getFormat, checkAccounts, createArray } from '../../data/data'
import translate from '../../i18n/translate'
import SVGInline from 'react-svg-inline'
export const DashboardDataKPI = (props) => {
  const [state, setState] = useState(false)

  const setInitialState = useCallback(() => {
    if (props.connectors) {
      const connectorsArray = createArray(props.connectors.items)
      if (checkAccounts(props.connectors, props.accounts)) {
        if (props.accounts) {
          for (let i = 0; i < connectorsArray.length; i++) {
            const connector = props.accounts[connectorsArray[i]]
            for (let j = 0; j < connector.length; j++) {
              if (
                connector[j] !== undefined &&
                connector[j].status === 'connected' &&
                connector[j].last_sync === 0
              ) {
                return 'synchronizing'
              }
            }
          }
        }

        if (
          props.connectors &&
          checkAccounts(props.connectors, props.accounts)
        ) {
          return 'available'
        } else {
          return 'unavailable'
        }
      } else {
        return 'unavailable'
      }
    } else {
      return ''
    }
  }, [props.accounts, props.connectors])

  useEffect(() => {
    setState(setInitialState())
  }, [state, setInitialState])

  return (
    <div className="dashboard__data">
      <div className="dashboard__data--title">
        {props.content && (
          <>{translate('components.kpi.' + props.content.title + '.title')}</>
        )}
        {props.openPanel && props.dataKpi.showHelp && (
          <div className="dashboard__help" onClick={props.openPanel}>
            <div className="dashboard__help--text">
              {translate('common.more_info')}
            </div>
          </div>
        )}
      </div>

      {props.dataKpi.showState && (
        <div className={'dashboard__state--' + state}>
          {state === 'synchronizing' && (
            <>
              <img
                src="/images/svg/sync-icon-orange.svg"
                className="preloader-sync"
                alt="sync"
              />
              <span>{translate('common.retrieving_data')}</span>
            </>
          )}

          {state === 'unavailable' && (
            <button className="btn btn-secondary" onClick={props.openPanel}>
              <span className="content">
                <span className="text">{translate('common.connect')}</span>
                <SVGInline
                  className="image-button"
                  svg={
                    '<svg width="24px" height="23px" viewBox="0 0 24 23" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
                    '<path d="M15.8403943,18.1269752 C16.3706408,18.1269752 16.8005266,18.5508685 16.8004816,19.0736791 L16.8004816,19.0736791 L16.8004816,21.913835 C16.8004816,22.43669 16.3706408,22.8605389 15.8403943,22.8605389 C15.3101478,22.8605389 14.880307,22.43669 14.880307,21.913835 L14.880307,21.913835 L14.880307,19.0736791 C14.880307,18.5508241 15.3101478,18.1269752 15.8403943,18.1269752 Z M7.31639586,9.42464865 C9.19102564,7.5761509 12.2298845,7.5761509 14.1045143,9.42464865 C14.4794492,9.79435707 14.4794492,10.3938075 14.1045143,10.7635159 C13.7295793,11.1332243 13.1216545,11.1332243 12.7467196,10.7635159 C11.6220047,9.65443502 9.79890543,9.65443502 8.67419056,10.7635159 L8.67419056,10.7635159 L3.24287674,16.1191181 C2.11816187,17.2281546 2.11816187,19.0258402 3.24310176,20.1350986 C4.36781662,21.2448452 6.1907359,21.2448452 7.31639586,20.1348767 L7.31639586,20.1348767 L10.0315802,17.4575416 C10.4065152,17.0878332 11.014485,17.0878332 11.3894199,17.4575416 C11.7643549,17.82725 11.7643549,18.4267004 11.3894199,18.7964089 L11.3894199,18.7964089 L8.67423557,21.473744 C6.79861568,23.323218 3.7595318,23.323218 1.88512704,21.473744 C0.010497257,19.6252462 0.010497257,16.6287486 1.88512704,14.7802508 L1.88512704,14.7802508 Z M17.0822116,16.5113259 C17.4571466,16.1416175 18.0650714,16.1416175 18.4400063,16.5113259 L18.4400063,16.5113259 L21.3193682,19.3505499 C21.6943031,19.7202583 21.6943031,20.3197087 21.3193682,20.6894172 C20.9444332,21.0591256 20.3365084,21.0591256 19.9615735,20.6894172 L19.9615735,20.6894172 L17.0822116,17.8501931 C16.7072767,17.4804847 16.7072767,16.8810343 17.0822116,16.5113259 Z M22.5611405,14.3401154 C23.091387,14.3401154 23.5212278,14.7639643 23.5212278,15.2868193 C23.5212278,15.8096742 23.091387,16.2335231 22.5611405,16.2335231 L22.5611405,16.2335231 L19.6808336,16.2335231 C19.1505871,16.2335231 18.7207462,15.8096742 18.7207462,15.2868193 C18.7207462,14.7639643 19.1505871,14.3401154 19.6808336,14.3401154 L19.6808336,14.3401154 Z M15.3260795,1.52586432 C17.2016543,-0.322367158 20.2403782,-0.322367158 22.114963,1.52608621 C23.9895928,3.37458396 23.9895928,6.37108161 22.114963,8.21957936 L22.114963,8.21957936 L16.1412063,14.1100628 C14.2665766,15.9585605 11.2277177,15.9585605 9.35308791,14.1100628 C8.97815296,13.7403544 8.97815296,13.1409039 9.35308791,12.7711955 C9.72802287,12.4014871 10.3359477,12.4014871 10.7108826,12.7711955 C11.8355975,13.8802764 13.6586518,13.8802764 14.7834116,12.7711955 L14.7834116,12.7711955 L20.7571683,6.88071209 C21.8818831,5.77167557 21.8818831,3.97398999 20.7571683,2.86495347 C19.6324084,1.75587258 17.8091291,1.75587258 16.6836491,2.86495347 L16.6836491,2.86495347 L13.426022,6.07716985 C13.051087,6.44687827 12.4431622,6.44687827 12.0682273,6.07716985 C11.6932923,5.70746142 11.6932923,5.10801101 12.0682273,4.73830258 L12.0682273,4.73830258 Z M4.31916644,6.76639582 C4.84941295,6.76639582 5.27925376,7.19024471 5.27925376,7.71309967 C5.27925376,8.23595463 4.84941295,8.65980353 4.31916644,8.65980353 L4.31916644,8.65980353 L1.43885948,8.65980353 C0.908612971,8.65980353 0.478772162,8.23595463 0.478772162,7.71309967 C0.478772162,7.19024471 0.908612971,6.76639582 1.43885948,6.76639582 L1.43885948,6.76639582 Z M2.6795067,2.30939234 C3.05444166,1.93968392 3.66236644,1.93968392 4.0373014,2.30939234 L4.0373014,2.30939234 L6.91954357,5.15145652 C7.29447852,5.52116494 7.29447852,6.12061536 6.91954357,6.49032378 C6.54460861,6.86003221 5.93668382,6.86003221 5.56174886,6.49032378 L5.56174886,6.49032378 L2.6795067,3.64825961 C2.30457174,3.27855118 2.30457174,2.67910077 2.6795067,2.30939234 Z M8.15960572,0.139335693 C8.68985223,0.139335693 9.11969304,0.56318459 9.11969304,1.08608393 L9.11969304,1.08608393 L9.11969304,3.92623987 C9.11969304,4.44909483 8.68985223,4.87294373 8.15960572,4.87294373 C7.62935921,4.87294373 7.1994734,4.44905045 7.1995184,3.92619549 L7.1995184,3.92619549 L7.1995184,1.08603955 C7.1995184,0.56318459 7.62935921,0.139335693 8.15960572,0.139335693 Z" fill="#FFFFFF" fill-rule="nonzero"></path>\n' +
                    '</svg>'
                  }
                />
              </span>
            </button>
          )}
        </div>
      )}

      {state === 'available' && (
        <>
          <div className="dashboard__data--row">
            <div className="dashboard__data--group">
              <div className="dashboard__data--value">
                {props.content.value !== '--'
                  ? getFormat(props.content.value, props.content.format)
                  : '--'}
              </div>
              {props.content.value !== '0.00' &&
                props.content.value_prev !== '0.00' &&
                props.content.percentage &&
                props.content.percentage !== '--' &&
                props.content.percentage !== undefined && (
                  <div
                    className={
                      'dashboard__data--percentage ' +
                      (parseFloat(props.content.percentage) > 0)
                    }
                  >
                    {props.content.percentage}
                  </div>
                )}
            </div>

            <label className="dashboard__data--label">
              {props.content.label}
            </label>

            {props.content.value !== '0.00' &&
              props.content.value_prev !== '0.00' &&
              props.content.percentage_value !== undefined && (
                <div
                  className={
                    'dashboard__data--percentage ' +
                    (parseFloat(props.content.percentage_value) > 0)
                  }
                >
                  {props.content.percentage_value}
                </div>
              )}
          </div>
          <div className="dashboard__data--row">
            <div className="dashboard__data--row-list">
              {props.content.value_prev && (
                <label className="dashboard__data--value_prev">
                  {props.content.value_prev !== '--'
                    ? getFormat(props.content.value_prev, props.content.format)
                    : '--'}
                </label>
              )}
            </div>
            <div className="dashboard__data--label_prev">
              {props.content.label_prev}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardDataKPI
