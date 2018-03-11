import React from 'react';
import PropType from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
    static propTypes = {
        title: PropType.string.isRequired,
        bookList: PropType.array.isRequired,
        onMove: PropType.func.isRequired
    };

    onMove(book, shelf) {
        // const book = this.props.bookList.filter((book) => book.id === id);
        this.props.onMove(book, shelf);
    };

    render() {
        const { bookList, title } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList && bookList.map((book) => (
                        <li key={book.id}>
                            <Book book={book}
                                  onMove={(book, shelf) => this.onMove(book, shelf)}/>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        );

    };

};

export default BookShelf;
