import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { ALL_BOOKS, ALL_GENRES } from '../gql'
import Select from 'react-select'
import _ from 'lodash'
import BookList from './BookList'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const [genre, setGenre] = useState('')
  const { data, error, loading } = useQuery(ALL_BOOKS, { 
    onError: props.handleError,
    variables: { genre }
  })


  var books = []
  var genres = []
  var genreOptions = [{ value: "", label: "all genres" }]

  if (!loading) {
    books = data.allBooks || []
    genres = _.uniq(_.flatten(books.map(b => b.genres)))
    genreOptions = genreOptions.concat(genres.map(g => ({ value: g, label: g })))

  }

  return (
    <div>
      <h2>books</h2>

      {loading ? <p>Loading...</p> : <BookList content={books.filter(a => genre ? _.includes(a.genres, genre) : true)} />}

      <div>
        <Select
          placeholder="Select genre..."
          value={genre}
          onChange={(target) => setGenre(target.value)}
          options={genreOptions}
        />
      </div>
    </div>
  )
}

export default Books