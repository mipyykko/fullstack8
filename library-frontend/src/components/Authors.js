import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import Select from 'react-select'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const editAuthor = useMutation(EDIT_AUTHOR)
  const { data, error, loading } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    
    const editedAuthor = await editAuthor({
      variables: { name: author, born: Number(born) },
      refetchQueries: [{ query: ALL_AUTHORS }]
    })

    setAuthor('')
    setBorn('')
  }

  var authors = []
  var authorOptions = []

  if (!loading) {
    authors = data.allAuthors
    authorOptions = data.allAuthors.map(a => ({ value: a.name, label: a.name }))
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

      <h2>Edit author birthyear</h2>

      <form onSubmit={submit}>
        <div>
          author
          <Select
            value={author}
            onChange={({ value }) => setAuthor(value)}
            options={authorOptions}
          />
        </div>
        <div>
          birthyear
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
          <div>
            <button type="submit">Edit author</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Authors