import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/Breadcrumb'
import TableLoader from '../../components/admin/TableLoader'
import Loading, { LoadingSize } from '../../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { getCurrency } from '../../data/data'
import { businessType, monthlyIncomeByCurrency } from '../../data/data'
import timeago from 'epoch-timeago'
import { useIntl } from 'react-intl'
import useAPI from 'hooks/useAPI'

export const Companies = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { formatMessage } = useIntl()
  const { apiCallApplicationsAdmin } = useAPI()

  const getCompanies = useCallback(async () => {
    try {
      let response = await apiCallApplicationsAdmin('/companies', 'GET')
      setData(response.content)
    } catch (e) {
      console.error('ERROR on GET /companies: ', e)
    } finally {
      setLoading(false)
    }
  }, [apiCallApplicationsAdmin])

  useEffect(() => {
    getCompanies()
  }, [getCompanies])

  const TimeAgo = ({ time }) => (
    <time dateTime={new Date(time).toISOString()}>{timeago(time)}</time>
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'applications[0].id',
      },
      {
        Header: formatMessage({ id: 'common.Name' }),
        accessor: (d) => d.name,
        sortType: 'basic',

        Cell: (props) => {
          const id_company = props.cell.row.original.id
          const id = props.cell.row.original.applications[0]
            ? props.cell.row.original.applications?.[0].id
            : false

          return (
            <div>
              {id ? (
                <Link
                  to={`/admin/companies/${id_company}/${id}`}
                  className="link link__full"
                >
                  {props.cell.row.original.name}
                </Link>
              ) : (
                <div>{props.cell.row.original.name}</div>
              )}
            </div>
          )
        },
      },
      {
        Header: 'Website',
        accessor: 'website',
        sortType: 'basic',
      },
      {
        Header: formatMessage({ id: 'common.monthly_income' }),
        accessor: 'monthly_income',
        sortType: 'basic',
        Cell: (props) => {
          return (
            <div>
              {props.value !== undefined
                ? formatMessage({
                    id: getValue(
                      props.value,
                      monthlyIncomeByCurrency(
                        getCurrency(props.row.original.country),
                      ),
                    ),
                  })
                : ''}
            </div>
          )
        },
      },
      {
        Header: formatMessage({ id: 'common.business_type' }),
        accessor: 'business_type',
        sortType: 'basic',
        Cell: (props) => (
          <div>
            {props.value !== undefined
              ? formatMessage({ id: getValue(props.value, businessType) })
              : ''}
          </div>
        ),
      },
      {
        Header: formatMessage({ id: 'common.Country' }),
        accessor: 'country',
        sortType: 'basic',
        Cell: (props) => formatMessage({ id: `data.countries.${props.value}` }),
      },
      {
        Header: formatMessage({ id: 'common.Status' }),
        accessor: 'applications[0].status',
        sortType: 'basic',
      },
      {
        Header: formatMessage({ id: 'common.Created' }),
        accessor: 'applications[0].created_at',
        sortType: 'basic',
        Cell: (props) => (
          <div className="table__th--small">{convertToDate(props.value)}</div>
        ),
      },
      {
        Header: formatMessage({ id: 'common.Updated' }),
        accessor: 'applications[0].updated_at',
        sortType: 'basic',
        Cell: (props) => (
          <div className="table__th--small">
            {props.value !== undefined ? (
              <TimeAgo time={props.value * 1000} />
            ) : (
              ''
            )}
          </div>
        ),
      },
    ],
    [formatMessage],
  )

  const convertToDate = (value) => {
    const date = new Date(value * 1000)
    return date.toLocaleDateString('es-ES')
  }

  const getValue = (value, obj) => {
    for (const [key] of Object.entries(obj)) {
      if (obj[key].value === value) {
        return obj[key].name
      }
    }
    return value
  }

  return (
    <>
      <Helmet>
        <title>RITMO Admin - {formatMessage({ id: 'common.Companies' })}</title>
      </Helmet>

      <Container className="">
        {loading ? (
          <div className="spinner__container">
            <LoadingSize size={60} />
          </div>
        ) : (
          <>
            <Breadcrumb previous="Admin" actual="Companies" />

            <div className="table__wrapper">
              {data && data.length > 0 && (
                <TableLoader columns={columns} data={data} />
              )}
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default withAuthenticationRequired(Companies, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
