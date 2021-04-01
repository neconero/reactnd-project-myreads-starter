import React, { Component} from 'react'

class BookShelf extends Component{
    render() {
        const {shelf} = this.props
        let shelfName = shelfRename(shelf)
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
            </div>
            
        )
    }
}

const shelfRename = (shelfString) =>{
    let name = 'None'
    if(shelfString === 'currentlyReading'){
        return 'Currently Reading'
    }else if(shelfString === 'wantToRead'){
        return 'Want to Read'
    }else if(shelfString === 'read'){
        return 'Read'
    }
    return name
}

export default BookShelf