import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`
const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const { data, error, loading } = useQuery(ALL_AUTHORS)

  var authors = []

  if (!loading) {
    authors = data.allAuthors
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {loading ? <tr>Loading...</tr> : authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors