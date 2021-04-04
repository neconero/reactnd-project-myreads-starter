import React, { Component} from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import Book from './Book'

class BookView extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfChange: PropTypes.func.isRequired
    }
    render() {
        const {books, shelfChange} = this.props
        
        const display= []
        let optionStatus = null

        books.forEach((book) => {
            if(book.shelf !== optionStatus){
                display.push(
                    <div className="bookshelf">
                        <BookShelf 
                            shelf={book.shelf}
                            
                        />
                    </div>
                    
                )
                console.log(display)
            }

            display.push(
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li key={book.title}>
                            <Book book={book} key={book.title}  onShelfChange={shelfChange}/>
                        </li>
                    </ol>
                </div>
                
            )

            optionStatus = book.shelf
        })
        
        return(
            <div>{display}</div>
        )
    }
}

export default BookView