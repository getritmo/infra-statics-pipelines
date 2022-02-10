import React, { useEffect, useState } from 'react'
import LayoutApp from 'layouts/LayoutApp'
import LayoutInitial from 'layouts/LayoutInitial'
import LayoutRitmoInsights from 'layouts/LayoutRitmoInsights'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setViewMode } from 'actions/appData'
import { userRoutes } from 'data/data'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const UserView = () => {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const { saveApplication } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(setViewMode('user'))
        let response = await apiCallApplications('', 'GET')
        saveApplication(response.application)
      } catch (e) {
        console.error('ERROR on GET /application: ', e)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [saveApplication, apiCallApplications, dispatch])

  return (
    <Switch>
      <Route path={userRoutes}>
        <LayoutApp loading={loading} />
      </Route>
      <Route path={'/ritmo-insights'}>
        <LayoutRitmoInsights loading={loading} />
      </Route>
      <Route path={['/initial', '/dashboard']}>
        <LayoutInitial />
      </Route>
    </Switch>
  )
}

export default UserView
