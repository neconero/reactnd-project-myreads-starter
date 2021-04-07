import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Search'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }

    
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
      .then((response) => {
        this.state.books.forEach((bookEl) => {
          if(bookEl.title === book.title){
            bookEl.shelf = shelf
          }
        })
        this.setState({
          books: this.state.books
        })
      })
      .catch(() => {
        console.error("Failed to find books")
      }) 
  }

  

  render() {
      return (
          <div>
            <Route exact path='/' render={() => (
              <ListBooks 
                books={this.state.books}
                shelfChange={this.updateShelf.bind(this)}
              />
            )} />
            <Route path='/search' render={(history) => (
              <Search books={this.state.books} shelfChange={this.updateShelf.bind(this)}/>
            )} />
          </div>
      )
  }
}

export default BooksApp
