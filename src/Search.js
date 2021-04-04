import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import searchTerm from './searchTerms'

class Search extends Component {
    state = {
        query: '',
        results: []
    }



    updateQuery = (query) => {
        this.setState(() => ({query: query.trim()}), () => {
            if(this.state.query && this.state.query.length > 1 ){
                if(this.isTermExist(this.state.query)){
                    this.searchLibrary(query)
                    
                }else{
                    return "Enter the Right Query Term"
                }
                
            }else if(!this.state.query){
                return 
            }
        })
    }

    isTermExist = (term) => {
        let terms = searchTerm()
        let wordCount =terms.indexOf(term)

        return wordCount > -1
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    handleOnInputChange = (event) => {
        const query = event.target.value
        this.updateQuery(query)
        
    }

    searchLibrary = (query) => {
        BooksAPI.search(query)
          .then((books) => {
            this.setState(() => ({
              results: books
            }))
          })
      }

    render() {
        const {query} = this.state
        const {shelfChange} = this.props
        console.log(this.state.results)
        
        return(
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link
                            className="close-search"
                            to='/'
                        >
                            Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Search by title or author" 
                                value={query}
                                onChange={this.handleOnInputChange}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.results.map(book => (
                                <li>
                                    <Book book={book} key={book.title} onShelfChange={shelfChange} />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search