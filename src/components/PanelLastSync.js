import React, { Fragment } from 'react'
import translate from '../i18n/translate'
import Moment from 'react-moment'
import 'moment/locale/es'
import 'moment/locale/en-gb'
import { useIntl } from 'react-intl'

export const PanelLastSync = (props) => {
  const intl = useIntl()
  const panelAccount = props.panelAccount
  Moment.globalLocale = intl.locale.substring(0, 2)

  return (
    <>
      {panelAccount.last_sync === 0 && panelAccount.status === 'connected' && (
        <div className="panel__sync">
          <div className="help">{translate('common.synchronizing.help')}</div>
          <img
            src="/images/svg/sync-icon-orange.svg"
            alt="sync"
            className="accounts__list--sync--img--animated"
          />
          <span className="desktop-visible">
            {translate('common.synchronizing.title')}
          </span>
        </div>
      )}
      {panelAccount.last_sync !== 0 && panelAccount.last_sync !== undefined && (
        <div className="panel__sync">
          <img
            src="/images/svg/synched-icon.svg"
            alt="sync"
            className="accounts__list--sync--img"
          />
          <span>{translate('common.synched')} </span>
          <Moment fromNow unix>
            {panelAccount.last_sync}
          </Moment>
        </div>
      )}
    </>
  )
}
export default PanelLastSync
