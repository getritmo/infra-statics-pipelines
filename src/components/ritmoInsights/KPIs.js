import React, { Fragment } from 'react'
import DashboardDataKPI from '../ritmoInsights/DashboardDataKPI'
import { dataKpi, RIConnectorsByType } from '../../data/data'
import { LoadingMin } from '../Loading'

const KPIs = (props) => {
  const accounts = props.accounts
  const content = props.content
  const openRIPanel = props.openRIPanel

  return (
    <div className="dashboard__cells-container full">
      <div
        className={
          'dashboard__cell-4row' + (props.showLoadingKPI ? ' show-loading' : '')
        }
      >
        {(!content || props.showLoadingKPI) && <LoadingMin />}
        {Object.entries(content).map((i) => {
          return (
            <Fragment key={i}>
              <div className="dashboard__cell-data">
                <DashboardDataKPI
                  content={i[1]}
                  accounts={accounts}
                  dataKpi={dataKpi[i[0]]}
                  connectors={RIConnectorsByType[i[0]]}
                  openPanel={() => {
                    openRIPanel(dataKpi[i[0]])
                  }}
                />
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default KPIs
