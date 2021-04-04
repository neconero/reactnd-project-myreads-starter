import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
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

  uhelper = (arr, doc, shelf) => {
    arr[arr.findIndex((arrElement) => 
      arrElement.title === doc.title
    )].shelf = shelf

    return arr
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.setState((currentState) => ({
      books: this.uhelper(currentState.books, book, shelf)
    }))
  }

  

  render() {
      return (
          <div>
            <Route exact path='/' render={() => (
              <ListBooks 
                books={this.state.books}
                shelfChange={this.updateShelf}
              />
            )} />
            <Route path='/search' render={(history) => (
              <Search shelfChange={this.updateShelf}/>
            )} />
          </div>
      )
  }
}

export default BooksApp
