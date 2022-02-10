import matchSorter from 'match-sorter'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

export default function useTableFilters() {
  const { formatMessage } = useIntl()

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const count = preFilteredRows.length

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} Records found`}
      />
    )
  }

  const fuzzyTextFilterFn = useCallback((rows, id, filterValue) => {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] })
  }, [])

  const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach((row) => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
      <select
        className={'filter__select'}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">
          {formatMessage({ id: `components.table_loader.select_filter.all` })}
        </option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {formatMessage({
              id: `components.table_loader.select_filter.${option}`,
            })}
          </option>
        ))}
      </select>
    )
  }
  const DateColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const count = preFilteredRows.length

    return (
      <input
        type="date"
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} Records found`}
        className={'filter__date'}
      />
    )
  }

  return {
    DefaultColumnFilter,
    fuzzyTextFilterFn,
    SelectColumnFilter,
    DateColumnFilter,
  }
}
