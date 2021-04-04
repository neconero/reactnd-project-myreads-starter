import React from 'react'
import PropTypes from 'prop-types'


const BookShelf = (props) => {
    const {shelf} = props
    let shelfName = shelfRename(shelf)
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
        </div>
        
    )
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

BookShelf.prototypes = {
    shelf: PropTypes.func.isRequired
}

export default BookShelf