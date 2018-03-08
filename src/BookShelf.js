import React from 'react';
import PropType from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
    static propTypes = {
        title: PropType.string.isRequired,
        bookList: PropType.array.isRequired
    };

    state = {
    };

    render() {
        const { bookList, title } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList && bookList.map((book) => (
                        <li key={book.title}>
                            <Book title={book.title} authors={book.authors} image={book.image}/>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        );

    };

};

export default BookShelf;
