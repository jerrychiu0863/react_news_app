import React from 'react';

import Time from './time';

const ListItem = ({ articles, sortByTime, handleLikes }) => {
    return (
        articles.sort(sortByTime).map(article => 
           <li key={article.title.toString()} className="article__listItem">
              <div className="listItem__mainContent">
                  <div className="listItem__maincontent-img"><img src={article.urlToImage} alt="img" /></div>
                  <div className="listItem__maincontent-detail">
                      <p className="detail-author">{article.author}</p>
                      <p className="detail-title"><a href={article.url}>{article.title}</a></p>
                      <div className="detail-likes">
                          <button onClick={() => handleLikes(article.title)}><i className="fas fa-heart"></i>
                          </button>
                          <p>Liked by {article.likes} people</p>
                      </div>
                      <Time time={article.publishedAt}>
                          Published 
                      </Time>
                  </div>
              </div>
              <div className="listItem__subContent"><p>{article.description}</p></div>
           </li>          
        )
    );
}                  
export default ListItem;