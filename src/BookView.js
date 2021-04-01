import React, { Component} from 'react'
import BookShelf from './BookShelf'
import Book from './Book'

class BookView extends Component{
    render() {
        const {books} = this.props
        console.log(books)
        const display= []
        let optionStatus = null

        books.forEach((book) => {
            if(book.shelf !== optionStatus){
                display.push(
                    <div className="bookshelf">
                        <BookShelf 
                            shelf={book.shelf}
                            key={book.shelf}
                        />
                    </div>
                    
                )
            }

            display.push(
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        <li >
                            <Book book={book} key={book.title} />
                        </li>
                    </ol>
                </div>
                
            )

            optionStatus = book.shelf
        })
        console.log(display)
        return(
            <div>{display}</div>
        )
    }
}

export default BookView