import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const SearchBar = () => {
    const [value, setValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (value.trim() !== '') {
        fetch('https://react-project-prs-default-rtdb.firebaseio.com/books.json')
        .then(response => response.json())
        .then(responseData => {
                setSearchResults([]); // Reset search results each time new data is fetched
                let searchQuery = value.toLowerCase();
                let filteredBooks = [];
                for(const key in responseData) {
                    if (responseData[key] && responseData[key].booktitle) {   
                        let book = responseData[key].booktitle.toLowerCase();
                        if(book.includes(searchQuery)) {
                            filteredBooks.push({ id: key, title: responseData[key].booktitle });
                        }
                    }
                }
                setSearchResults(filteredBooks);
                console.log(searchResults);
            })
            .catch(error => console.error('Error fetching data:', error));
        }
        else{
            setSearchResults([]);
        }
        
    },[value])

  return (
    <div>
        <div className='banner-search'>
                <input type="search" name='search' id='search' placeholder='Search a Book' className='search-input' 
                onChange={(e) => setValue(e.target.value)} value={value}/>
                {/* <button className='search-button'>Search</button> */}
                <div className='search-results'>
                     {searchResults.length > 0 ? (
                    searchResults.map((searchResult) => (
                        <Link key={searchResult.id} to={`/book/${searchResult.id}`}>
                            <div className='search-entry'>
                                {searchResult.title}
                            </div>
                        </Link>
                    ))
                ) : value.trim() !== '' ? (
                    <div className='no-results'>No books found</div>
                ) : null}
                </div>
              </div>
    </div>
  )
}

export default SearchBar