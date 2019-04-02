import React from 'react';
import Book from './Book';

const BooksGrid = props => (
  <ol className="books-grid">
    {props.books.map((book) => (
      <li>
        <Book />
      </li>
    ))}
  </ol>
)

export default BooksGrid;