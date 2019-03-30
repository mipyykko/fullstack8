import { gql } from 'apollo-boost'

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    author {
      name
      born
    }
    genres
  }
}
`

export const ALL_BOOKS = gql`
{
  allBooks {
    title
    author { 
      name
      born
    }
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_GENRES = gql`
{
  allGenres
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`