import React from 'react';

import Button from './button';

const Search = ({ onSubmit, onChange, value, children }) => {
    return(
        
       <form onSubmit={ onSubmit } className="searchForm">
           <p>{children}</p>
           <div>
              <input 
                  onChange={onChange} 
                  value={value} 
                  placeholder="Search news..."
              />
               <Button 
                  onClick={onSubmit} 
                  className="searchForm-btn">
                   Search
               </Button>
           </div>
           <div>
               <i className="fas fa-user"></i>
           </div>
       </form>
        
    );
}

export default Search;