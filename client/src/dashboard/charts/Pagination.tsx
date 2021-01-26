/*
 * © 2020 ThoughtWorks, Inc. All rights reserved.
 */

import React, { FunctionComponent, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { IconButton, makeStyles } from '@material-ui/core'

export const usePaginateData = (data: any[], pageSize: number) => {
  const paginatedData = []
  const newEntries = [...data]
  while (newEntries.length > 0) {
    const paginatedSubData = newEntries.splice(0, pageSize)
    paginatedData.push(paginatedSubData)
  }
  return {
    paginatedData,
    totalPages: paginatedData.length,
  }
}

const useStyles = makeStyles(() => {
  return {
    paginationContainer: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }
})

interface PaginateData {
  data: any[]
  pageSize: number
}

export interface PaginationProps extends PaginateData {
  handlePage: (page: any[]) => void
}

const Pagination: FunctionComponent<PaginationProps> = ({ data, pageSize, handlePage }) => {
  const { paginationContainer } = useStyles()
  const [page, setPage] = useState(0)
  const { paginatedData, totalPages } = usePaginateData(data, pageSize)
  const visibleRows = `${page * pageSize + 1} - ${page * pageSize + paginatedData[page]?.length}`

  useEffect(() => {
    handlePage(paginatedData[0])
    setPage(0)
  }, [JSON.stringify(data)])

  const onPageChange = (newPage: number) => {
    setPage(newPage)
    handlePage(paginatedData[newPage])
    console.log('hit', newPage)
  }

  return (
    <div className={paginationContainer}>
      <span style={{ color: '#ababab', fontWeight: 700, marginRight: '8px' }}>
        {visibleRows} of {data.length}
      </span>
      <IconButton
        color="primary"
        aria-label="chevron-left"
        component="button"
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="chevron-right"
        component="button"
        disabled={page === totalPages - 1}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  )
}

export default Pagination