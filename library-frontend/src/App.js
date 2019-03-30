import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

      <Authors
        show={page === 'authors'}
        handleError={handleError}
      />

      <Books
        show={page === 'books'}
        handleError={handleError}
      />

      <NewBook
        show={page === 'add'}
        handleError={handleError}
      />

    </div>
  )
}

export default App
