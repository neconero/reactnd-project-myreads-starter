import React, { Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component{

    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired,
    }

    changeShelf = (shelf) => {
        this.props.onShelfChange(this.props.book, shelf)
    }
    
    render(){
        const {book} = this.props
        return (
            <div className="book">
                <div className="book-top">
                    { book.imageLinks === undefined ? "" :
                        <div className="book-cover" 
                        style={
                            { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    }
                    <div className="book-shelf-changer">
                        <select onClick={(event) => this.changeShelf(event.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors === undefined ? "" : <div className="book-authors">{book.authors}</div>}
            </div>
            
        )
    }
}


export default Book