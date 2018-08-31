import React from 'react';

import Button from './button';

const SideBar = ({ savedArticles, onDismiss }) => {
            
        return(
            <ul className="sideBar">
                {savedArticles.map( article => 
                    <li key={article.id} className="sideBar__mainContent">

                             <div className="sideBar__img">
                                 <img src={article.urlToImage}  alt="img" />
                             </div>
                             <div className="sideBar__detail">
                                 <p className="sideBar__detail--title"><a href={article.url}>{article.title}</a></p>
                                 <p className="sideBar__detail--author">{article.author}</p>
                                 <Button onClick={() => onDismiss(article.id)}>
                                     Dismiss
                                 </Button>
                             </div>

                    </li>
                )}
            </ul> 
        );

    
}

export default SideBar;