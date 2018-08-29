import React from 'react';

const Search = ({ onSubmit, onChange }) => {
    return(
        
       <form onSubmit={onSubmit} className="search">
           <input onChange={onChange} />
           <button>Search</button>
       </form>
    );
}

export default Search;