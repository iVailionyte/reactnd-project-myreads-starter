import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';
import './App.css';
import BooksShelf from './BooksShelf';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    filteredBooks: [],
  }
  componentDidMount() {
    this.getBooks()
  }
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(() => {
      this.getBooks()
    })
  }
  getBooks() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  getFilteredBooks(query) {
    if (query) {
      BooksAPI.search(query)
      .then((books) => {
        if (books.error) {
          this.setState(() => ({
            filteredBooks: []
          }))
        } else { 
          this.setState(() => ({
            filteredBooks: books
          }))
        }
      })
    } else {
      this.setState(() => ({
        filteredBooks: []
      }))
    }
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BooksShelf title="Currently Reading" books={this.state.books.filter(book => book.shelf === 'currentlyReading')} onChangeShelf={this.changeShelf} />
              <BooksShelf title="Want to Read" books={this.state.books.filter(book => book.shelf === 'wantToRead')} onChangeShelf={this.changeShelf} />
              <BooksShelf title="Read" books={this.state.books.filter(book => book.shelf === 'read')} onChangeShelf={this.changeShelf} />
            </div>
          </div>
          <div className="open-search">
            <Link className="open-search-button" to="/search"></Link>
          </div>
        </div>
        )} />
        <Route path="/search" render={() => (
          <div className="search-books">
          <div className="search-books-bar">
            
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" onChange={(ev) => this.getFilteredBooks(ev.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.filteredBooks.map((book) => 
                <li key={book.id}>
                  <Book book={book} onChangeShelf={this.changeShelf} />
                </li>
              )}
            </ol>
          </div>
        </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
