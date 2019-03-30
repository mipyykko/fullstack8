import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { LOGIN } from '../gql'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = useMutation(LOGIN)

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    try {
      const res = await login({
        variables: { username, password }
      })

      const token = res.data.login.value

      props.setToken(token)
      localStorage.setItem('library-token', token)
    } catch (error) {
      props.handleError(error)
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username" />
        </div>
        <div>
          password
          <input 
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password" 
            name="password" />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
