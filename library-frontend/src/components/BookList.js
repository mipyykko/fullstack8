import React from 'react'

const BookList = ({ content }) => {
  return (
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
      {content.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}

export default BookList