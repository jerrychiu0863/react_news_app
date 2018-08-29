import React from 'react';

import ListItem from './listItem';

const List = ({ articles, sortByTime, handleLikes }) => {
    return(
        <ul className="article__list">
            <ListItem articles={ articles } sortByTime={ sortByTime } handleLikes={handleLikes}/>
        </ul>
    );
}

export default List;