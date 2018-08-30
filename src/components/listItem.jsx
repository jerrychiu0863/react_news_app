import React from 'react';

import Time from './time';
import Button from './button';
import Image from './image';

const ListItem = ({ articles, sortByTime, handleLikes, handleDislikes, handleSavedArticle }) => {
    return (
        articles.sort(sortByTime).map(article => 
           <li key={article.title.toString()} className="article__listItem">
              <div className="listItem__mainContent">
                  <Image src={article.urlToImage} />
                  <div className="listItem__maincontent-detail">
                      <p className="detail-author">{article.author}</p>
                      <p className="detail-title"><a href={article.url}>{article.title}</a></p>
                      <div className="detail-likes">
                          <Button onClick={() => handleLikes(article.id)}><i className="fas fa-thumbs-up"></i>
                          </Button>
                          <p>{article.likes}</p>
                          <Button onClick={() => handleDislikes(article.id)}><i className="fas fa-thumbs-down"></i>
                          </Button>
                          <p>{article.dislikes}</p>
                          <Button onClick={() => handleSavedArticle(article.id)}>
                              save
                          </Button>
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