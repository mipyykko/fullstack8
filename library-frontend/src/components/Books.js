import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { ALL_BOOKS } from '../gql'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const { data, error, loading } = useQuery(ALL_BOOKS, { onError: props.handleError })

  var books = []

  if (!loading) {
    books = data.allBooks || []
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {loading ? <tr>Loading...</tr> : books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books