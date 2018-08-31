import React from 'react';

const Image = ({ src }) => {
    return(
         <div className="listItem__maincontent-img">
             <img src={ src } alt="img" />
         </div>
    );
}

export default Image;