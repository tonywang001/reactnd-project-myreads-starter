import React from 'react';
import PropType from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
    static propTypes = {
        title: PropType.string.isRequired,
        bookList: PropType.array.isRequired,
        onMove: PropType.func.isRequired
    };

    onMove(key, shelf) {
        this.props.onMove(key, shelf);
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
                            <Book id={book.id} title={book.title} authors={book.authors} 
                                  image={book.image} shelfId={book.shelfId}
                                  onMove={(id, shelf) => this.onMove(id, shelf)}/>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        );

    };

};

export default BookShelf;
