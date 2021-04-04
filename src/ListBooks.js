import React from 'react'
import {Link} from 'react-router-dom'
import BookView from './BookView'
import PropTypes from 'prop-types'

const ListBooks = (props) => {
    const {books, shelfChange} = props
    return (
        <div className="list-books">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <BookView books={books} shelfChange={shelfChange}/>
                </div>    
              </div>
          </div>
          <div className="open-search">
              <Link
                to="/search"
                className="link-search"
              >Add a book</Link>
          </div>  
      </div>
    ) 
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    shelfChange: PropTypes.func.isRequired,
}

export default ListBooks