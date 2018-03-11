import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookShelf from './BookShelf';
import Book from './Book';

class BooksApp extends React.Component {
  state = {
    bookList: [],
    searchBookList: [],
    shelfList: [
      {
        id: "currentlyReading",
        title: "Currently Reading"
      },
      {
        id: "wantToRead",
        title: "Want to Read"
      },
      {
        id: "read",
        title: "Read"
      },
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({bookList: books});
    });
  };

  // Move the book to target shelf
  onMove(book, shelf) {
    BooksAPI.update(book, shelf)
    .then((res) => {
      return BooksAPI.getAll();
    })
    .then((books) => {
      this.setState({bookList: books});
    })
    .catch(() => {
      console.log('Error: failed to move the book');
    });
  };

  getBookListForShelf(shelf) {
    return this.state.bookList.filter((book) => 
      shelf === book.shelf
    );
  };

  search(query) {
    BooksAPI.search(query).then((books) => {
      console.log('book from search: ' + books);
      this.setState({searchBookList: books});
    })
    .catch(() => {
      this.setState({searchBookList: []});
    });
  }

  getBookShelf(book) {
    const matchedBook = this.state.bookList.filter((myBook) => myBook.id === book.id);
    if (matchedBook && matchedBook[0]){
      return matchedBook[0].shelf;
    } else {
      return 'none';
    }
  }

  render() {
    const { bookList, searchBookList, shelfList } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookList && shelfList && shelfList.map((shelf) => (
                  <BookShelf key={shelf.id} 
                             title={shelf.title} 
                             bookList={this.getBookListForShelf(shelf.id)}
                             onMove={(book, shelf) => this.onMove(book, shelf)}
                             getBookShelf={(book) => this.getBookShelf(book)}/>
                ))}
              </div>
            </div>
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link to='/search'>Add a book</Link>
            </div>

          </div>
        )}/>
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.search(e.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchBookList && searchBookList.map((book) => (
                  <li key={book.id}>
                    <Book book={book}
                          shelf={book.shelf}
                          onMove={(book, shelf) => this.onMove(book, shelf)}
                          getBookShelf={(book) => this.getBookShelf(book)}/>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
