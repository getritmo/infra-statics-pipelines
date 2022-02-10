import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../Loading'
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table'
import translate from '../../i18n/translate'
import useTableFilters from 'hooks/useTableFilters'
import moment from 'moment'

export const TableLoader = ({ columns, data, hideFilters }) => {
  const { DefaultColumnFilter, fuzzyTextFilterFn } = useTableFilters()

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [DefaultColumnFilter],
  )

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = (val) => !val

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
      date: (rows, id, filterValue) => {
        const columnParameter = id[0]
        switch (columnParameter) {
          case 'payment.created_at':
            return rows.filter((row) => {
              const rowDate = moment(
                moment.unix(row.original.payment.created_at),
              ).format('YYYY-MM-DD')
              return moment(filterValue).isSame(moment(rowDate))
            })
          case 'payment.period':
            return rows.filter((row) => {
              const rowStartDate = moment(
                moment.unix(row.original.invoice.period_start),
              ).format('YYYY-MM-DD')
              const rowEndDate = moment(
                moment.unix(row.original.invoice.period_end),
              ).format('YYYY-MM-DD')
              return (
                moment(filterValue).isSameOrAfter(moment(rowStartDate)) &&
                moment(filterValue).isSameOrBefore(moment(rowEndDate))
              )
            })
        }
      },
    }),
    [fuzzyTextFilterFn],
  )

  const useFiltersDefault = hideFilters ? '' : useFilters
  const useGlobalFilterDefault = hideFilters ? '' : useGlobalFilter

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        pageSize: 30,
        sortBy: [
          {
            id: 'created_at',
            desc: true,
          },
        ],
      },
    },
    useFiltersDefault, // useFilters!
    useGlobalFilterDefault, // useGlobalFilter!
    useSortBy,
    usePagination,
  )

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      <div className="table__wrapper">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`header-${i}`}>
                {headerGroup.headers.map((column, j) => (
                  <th
                    key={`header-${i}-column-${j}`}
                    className={column.Header}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      paddingLeft: '10px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted && (
                        <>
                          {column.isSortedDesc && <span className="up" />}
                          {!column.isSortedDesc && <span className="down" />}
                        </>
                      )}
                    </span>

                    <div onClick={stopPropagation}>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={`page-${i}`}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={`page-${i}-cell-${j}`}
                        style={{
                          padding: '10px',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="table__pagination">
        <div className="table__pagination--container">
          <div>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              {translate('common.Page')}{' '}
              <strong>
                {pageIndex + 1} {translate('common.of')} {pageOptions.length}
              </strong>{' '}
            </span>
          </div>
          <span className="table__pagination--fields">
            {translate('components.table_loader.go_to_page')}:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            />
            <span className="form-group select">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                }}
                className="form-control"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </span>
          </span>
        </div>
      </div>
    </>
  )
}

export default withAuthenticationRequired(TableLoader, {
  Redirecting: () => <Loading />,
})
