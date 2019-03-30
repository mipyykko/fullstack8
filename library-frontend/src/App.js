import React, { useState } from 'react'
import { useQuery, useApolloClient } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'

import { ME } from './gql'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token ? 
          <button onClick={() => setPage('login')}>login</button> :
          <button onClick={() => logout()}>logout</button>}
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

      <Recommend
        show={page === 'recommend'}
        handleError={handleError}
      />

      <NewBook
        show={page === 'add'}
        handleError={handleError}
      />

      <LoginForm
        show={page === 'login'}
        handleError={handleError}
        setToken={token => setToken(token)}
      />
    </div>
  )
}

export default App
