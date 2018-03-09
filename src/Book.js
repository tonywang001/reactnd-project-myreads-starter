import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        shelf: PropTypes.string,
        onMove: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.options = [
            {
                value: "",
                desc: "Move to...",
                disabled: true
            },
            {
                value: "currentlyReading",
                desc: "Currently Reading",
                disabled: false
            },
            {
                value: "wantToRead",
                desc: "Want to Read",
                disabled: false
            },
            {
                value: "read",
                desc: "Read",
                disabled: false
            },
            {
                value: "none",
                desc: "None",
                disabled: false
            }
        ];
    }

    render() {
        const { id, title, authors, image, shelfId, onMove } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: image}}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => onMove(id, e.target.value)} defaultValue={shelfId}>
                                {this.options.map((option) => (
                                    <option key={option.value} value={option.value} disabled={option.disabled}>{option.desc}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        );
    };

};

export default Book;
