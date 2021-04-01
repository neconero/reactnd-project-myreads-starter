import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookView from './BookView'
import './App.css'

class BooksApp extends React.Component {
 
  state = {
    books: []
  }

  componentDidMount(){
      BooksAPI.getAll()
        .then((books) => {
          this.setState(() => ({
              books
          }))
      })
  }

  render() {
      return (
          <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <BookView books={this.state.books}/>
                    </div>    
                  </div>
              </div>
              
          </div>
      )
  }
}

export default BooksApp
