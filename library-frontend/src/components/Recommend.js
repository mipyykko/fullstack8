import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { ALL_BOOKS, ME } from '../gql'
import BookList from './BookList'
import _get from 'lodash'

const Recommend = (props) => {
  if (!props.show) {
    return null
  }

  const userResult = useQuery(ME)

  const user = !userResult.loading ? userResult.data.me : null
  const genre = user ? user.favoriteGenre : ''

  const result = useQuery(ALL_BOOKS, { 
    onError: props.handleError,
    variables: { genre }
  })
  
  const books = result.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>

      <p>Books in your favorite genre <b>{genre}</b>:</p>

      <BookList content={books} />
    </div>
  )
}

export default Recommend