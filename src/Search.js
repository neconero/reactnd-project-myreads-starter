import React, { Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import searchTerm from './searchTerms'

class Search extends Component {
    state = {
        query: '',
        results: [],
        error: false
    }

    

    updateQuery = (query) => {
        this.setState(() => ({query: query}), () => {
            if(this.state.query && this.state.query.length > 0 ){    
                let word = this.isTermExist(this.state.query)
                if(word === 'Not a search term'){
                    return 'Not a search term'
                }   
                this.searchLibrary(word)    
            }else if(this.state.query === ''){
                return 
            }
        })
    }

    isTermExist = (term) => {
        let terms = searchTerm()
        let filterArr = terms.filter((word) => {
            return word.toLowerCase().includes(term)   
          })
        if(filterArr === null){
            return "Not a search term"
        }
        let term_found =  filterArr[Math.floor(Math.random()*filterArr.length)]

        return term_found
    }

    
    handleOnInputChange = (event) => {
        const query = event.target.value

        this.updateQuery(query)
        
    }

     bookShelfCheck = (book) => {
        this.props.books.forEach(bookEl => {
            if(bookEl.title === book.title){
                book.shelf = bookEl.shelf
            }
        })
    }

    searchLibrary = async (query) => {

        try {
            const books = await BooksAPI.search(query)
            await books.forEach((book) =>{
                        if(book.shelf === undefined){
                            book.shelf = "none"
                        }
                        this.bookShelfCheck(book)
                    })
            
            this.setState(() => ({
                results: books
            }))
        } catch (error) {
            this.setState({ error: true, query: '' })
            alert('Wrong search query please try again...')
        }
        
          
      }

    render() {
        const {query} = this.state
        const {shelfChange} = this.props

        
        
        
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
                    {this.state.query !== ''  &&  
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.results && this.state.results.map((book, index) => (
                                    <li key={index}>
                                        <Book book={book} key={index} onShelfChange={shelfChange} />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

export default Search