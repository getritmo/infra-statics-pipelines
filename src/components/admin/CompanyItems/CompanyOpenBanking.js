import React from 'react'
import MetabaseViewer from 'components/MetabaseViewer/MetabaseViewer'
import { useParams } from 'react-router'

const CompanyOpenBanking = () => {
  const { applicationId } = useParams()

  return (
    <div className="table__iframe">
      <MetabaseViewer
        base={
          'https://ritmo.metabaseapp.com/public/dashboard/80f72343-2327-4eb1-a6b6-df272ed5d031'
        }
        path={`?id_app=${applicationId}`}
        onLocationChange={(location) => {
          history.push(`?id_app=${location}`)
        }}
        frameMode={'normal'}
        getAuthUrl={(url) =>
          `/api/auth/metabase?return_to=${encodeURIComponent(url)}`
        }
        height={1000}
        width={'100%'}
      />
    </div>
  )
}

export default CompanyOpenBanking
