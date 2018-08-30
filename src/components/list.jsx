import React from 'react';

import ListItem from './listItem';

const List = ({ articles, sortByTime, handleLikes, handleDislikes, handleSavedArticle }) => {
    return(
        <ul className="article__list">
            <ListItem articles={ articles } sortByTime={ sortByTime } handleLikes={handleLikes} handleDislikes={handleDislikes} handleSavedArticle={handleSavedArticle}/>
        </ul>
    );
}

export default List;