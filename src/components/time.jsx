import React from 'react';

import moment from 'moment';

const Time = ({ time, children }) => {
    const timeString = moment(time).fromNow();
    
    return(
        <p className="detail-time">{children} {timeString}</p>
    );
}

export default Time;