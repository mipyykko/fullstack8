import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author
    published
  }
}
`

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const { data, error, loading } = useQuery(ALL_BOOKS)

  var books = []

  if (!loading) {
    books = data.allBooks
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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books