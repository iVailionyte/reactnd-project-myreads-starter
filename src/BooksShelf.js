import React from 'react';
import BooksGrid from './BooksGrid';

const BooksShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <BooksGrid books={[{id: "book"}]}/>
    </div>
  </div>
)

export default BooksShelf;