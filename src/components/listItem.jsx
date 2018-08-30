import React from 'react';

import Time from './time';
import Image from './image';
import Vote from './vote';

const ListItem = ({ articles, sortByTime, handleLikes, handleDislikes, handleSavedArticle }) => {
    return (
        articles.sort(sortByTime).map(article => 
           <li key={ article.title.toString() } className="article__listItem">
              <div className="listItem__mainContent">
                  <Image src={ article.urlToImage } />
                  <div className="listItem__maincontent-detail">
                      <p className="detail-author">
                          { article.author }
                      </p>
                      <p className="detail-title">
                          <a href={ article.url }>{ article.title }</a>
                      </p>
                      <Vote 
                          articleID={ article.id } 
                          handleLikes={ handleLikes }  
                          handleDislikes={ handleDislikes }
                          handleSavedArticle={ handleSavedArticle } articleLikes={ article.likes } 
                          articleDislikes={ article.dislikes } 
                      />
                      <Time time={ article.publishedAt }>
                          Published 
                      </Time>
                  </div>
              </div>
              <div className="listItem__subContent">
                  <p>{ article.description }</p>
              </div>
           </li>          
        )
    );
}                  
export default ListItem;