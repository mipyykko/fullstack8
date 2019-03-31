import React, { useState } from 'react'
import { useMutation, useApolloClient, useSubscription } from 'react-apollo-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'

import { BOOK_ADDED, ALL_BOOKS, ADD_BOOK } from './gql'

const includedIn = (set, object) => 
    set.map(p => p.id).includes(object.id)  

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  const { data, error, loading } = useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log('subscription subdata', subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)

      const dataInStore = client.readQuery({ query: ALL_BOOKS })
      
      console.log('subscription', dataInStore)

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({
          query: ALL_BOOKS,
          data: dataInStore
        })
      }
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }
  
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

  const addBook = useMutation(ADD_BOOK, {
    onError: handleError,
    update: (store, response) => {
      console.log('mutation res', response)
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      const addedBook = response.data.addedBook

      console.log('mutation', dataInStore)

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({
          query: ALL_BOOKS,
          data: dataInStore
        })
      }
    }
  })

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
        addBook={addBook}
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
