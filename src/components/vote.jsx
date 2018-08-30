import React from 'react';

import Button from './button';

const Vote = ({ articleID, handleLikes, handleDislikes, handleSavedArticle, articleLikes, articleDislikes}) => {
    return(
         <div className="detail-vote">
              <Button onClick={() => handleLikes(articleID)} className="vote-btn">
                  <i className="fas fa-thumbs-up"></i>
              </Button>
              <p>{articleLikes}</p>
              <Button onClick={() => handleDislikes(articleID)} className="vote-btn">
                  <i className="fas fa-thumbs-down"></i>
              </Button>
              <p>{articleDislikes}</p>
              <Button onClick={() => handleSavedArticle(articleID)} className="vote-btn vote-btn-save">
                  save
              </Button>
        </div>
    );
}

export default Vote;