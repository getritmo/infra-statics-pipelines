import React from 'react'
import { Switch, Route } from 'react-router'
import Initial from 'views/Initial'
const LayoutInitial = () => {
  return (
    <div className="layout-initial">
      <Switch>
        <Route path="/initial" component={Initial} />
      </Switch>
    </div>
  )
}

export default LayoutInitial
